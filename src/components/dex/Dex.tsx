import { useState, useEffect, useMemo } from 'react';
import { useMoralis } from 'react-moralis';
import InchModal from './components/InchModal';
import useInchDex from 'hooks/useInchDex';
import { Button, Card, Image, InputNumber, Modal } from 'antd';
import Text from 'antd/lib/typography/Text';
import { ArrowDownOutlined } from '@ant-design/icons';
import { useTokenPrice } from 'react-moralis';
import { tokenValue } from 'helpers/formatters';
import { getWrappedNative } from 'helpers/networks';

const styles = {
  card: {
    width: '430px',
    boxShadow: '0 0.5rem 1.2rem rgb(189 197 209 / 20%)',
    border: '1px solid #e7eaf3',
    borderRadius: '1rem',
    fontSize: '16px',
    fontWeight: '500',
  },
  input: {
    padding: '0',
    fontWeight: '500',
    fontSize: '23px',
    display: 'block',
    width: '100%',
    color: 'black',
  },
  priceSwap: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '15px',
    color: '#434343',
    marginTop: '8px',
    padding: '0 10px',
  },
};

const nativeAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

const chainIds: any = {
  '0x1': 'eth',
  '0x38': 'bsc',
  '0x89': 'polygon',
};

const getChainIdByName = (chainName: string) => {
  for (let chainId in chainIds) {
    if (chainIds[chainId] === chainName) return chainId;
  }
};

const IsNative = (address: string) =>
  address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

const DSX = ({
  chain,
  customTokens = {},
}: {
  chain: string;
  customTokens?: any;
}) => {
  const { trySwap, tokenList, getQuote } = useInchDex(chain);
  const { Moralis, isInitialized, chainId } = useMoralis();
  const [isFromModalActive, setFromModalActive] = useState(false);
  const [isToModalActive, setToModalActive] = useState(false);
  const [toToken, setToToken] = useState<any>();
  const [fromAmount, setFromAmount] = useState<any>();
  const [fromToken, setFromToken] = useState<any>();
  const [quote, setQuote] = useState<any>();
  const [currentTrade, setCurrentTrade] = useState<any>();
  const { fetchTokenPrice } = useTokenPrice({ address: '' });
  const [tokenPricesUSD, setTokenPricesUSD] = useState<any>();

  const tokens = useMemo(() => {
    if (tokenList) return { ...customTokens, ...tokenList };
  }, [customTokens, tokenList]);

  const toTokens = useMemo(() => {
    let obj: any = {};
    if (tokenList) {
      for (let key in tokenList) {
        if (
          tokenList[key].symbol === 'USDC' ||
          tokenList[key].symbol === 'USDT' ||
          tokenList[key].symbol === 'BUSD' ||
          tokenList[key].symbol === 'USDP'
        ) {
          Object.assign(obj, { [key]: tokenList[key] });
        }
      }
    }
    return obj;
  }, [tokenList]);
  const fromTokenPriceUsd = useMemo(
    () =>
      tokenPricesUSD?.[fromToken?.['address']]
        ? tokenPricesUSD[fromToken?.['address']]
        : null,
    [tokenPricesUSD, fromToken]
  );
  const toTokenPriceUsd = useMemo(
    () =>
      tokenPricesUSD?.[toToken?.['address']]
        ? tokenPricesUSD[toToken?.['address']]
        : null,
    [tokenPricesUSD, toToken]
  );
  const fromTokenAmountUsd = useMemo(() => {
    if (!fromTokenPriceUsd || !fromAmount) return null;
    return `~$ ${(fromAmount * fromTokenPriceUsd).toFixed(4)}`;
  }, [fromTokenPriceUsd, fromAmount]);

  const toTokenAmountUsd = useMemo(() => {
    if (!toTokenPriceUsd || !quote) return null;
    return `~$ ${(
      Moralis?.Units?.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals) *
      toTokenPriceUsd
    ).toFixed(4)}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toTokenPriceUsd, quote]);

  // tokenPrices
  useEffect(() => {
    if (!isInitialized || !fromToken || !chain) return;
    const validatedChain: any = chain ? getChainIdByName(chain) : chainId;
    const tokenAddress = IsNative(fromToken['address'])
      ? getWrappedNative(validatedChain)
      : fromToken['address'];
    fetchTokenPrice({
      params: { chain: validatedChain, address: tokenAddress },
      onSuccess: (price: any) =>
        setTokenPricesUSD({
          ...tokenPricesUSD,
          [fromToken['address']]: price['usdPrice'],
        }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, isInitialized, fromToken]);

  useEffect(() => {
    if (!isInitialized || !toToken || !chain) return;
    const validatedChain: any = chain ? getChainIdByName(chain) : chainId;
    const tokenAddress = IsNative(toToken['address'])
      ? getWrappedNative(validatedChain)
      : toToken['address'];

    fetchTokenPrice({
      params: { chain: validatedChain, address: tokenAddress },
      onSuccess: (price: any) =>
        setTokenPricesUSD({
          ...tokenPricesUSD,
          [toToken['address']]: price['usdPrice'],
        }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, isInitialized, toToken]);

  useEffect(() => {
    if (!tokens || fromToken) return;
    setFromToken(tokens[nativeAddress]);
  }, [tokens, fromToken]);

  const ButtonState = useMemo(() => {
    if (chainId === null)
      return { isActive: false, text: `Switch to ${chain}` };
    if (chainIds?.[chainId] !== chain)
      return { isActive: false, text: `Switch to ${chain}` };

    if (!fromAmount) return { isActive: false, text: 'Enter an amount' };
    if (fromAmount && currentTrade) return { isActive: true, text: 'Swap' };
    return { isActive: false, text: 'Select tokens' };
  }, [fromAmount, currentTrade, chainId, chain]);

  useEffect(() => {
    if (fromToken && toToken && fromAmount)
      setCurrentTrade({ fromToken, toToken, fromAmount, chain });
  }, [toToken, fromToken, fromAmount, chain]);

  useEffect(() => {
    if (currentTrade) getQuote(currentTrade).then((quote) => setQuote(quote));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrade]);

  const PriceSwap = () => {
    const Quote = quote;
    if (!Quote || !tokenPricesUSD?.[toToken?.['address']]) return null;
    if (Quote?.statusCode === 400) return <>{Quote.message}</>;
    const { fromTokenAmount, toTokenAmount } = Quote;
    const { symbol: fromSymbol } = fromToken;
    const { symbol: toSymbol } = toToken;

    const pricePerToken = parseFloat(
      tokenValue(
        Number(fromTokenAmount),
        Number(fromToken['decimals']) /
          tokenValue(toTokenAmount, toToken['decimals'])
      ).toFixed(6)
    );
    return (
      <Text style={styles.priceSwap}>
        Price:
        <Text>{`1 ${toSymbol} = ${pricePerToken} ${fromSymbol} ($ ${tokenPricesUSD?.[
          toToken?.['address']
        ].toFixed(6)})`}</Text>
      </Text>
    );
  };
  return (
    <>
      <Card style={styles.card} bodyStyle={{ padding: '18px' }}>
        <Card
          style={{ borderRadius: '1rem' }}
          bodyStyle={{ padding: '0.8rem' }}
        >
          <div
            style={{ marginBottom: '5px', fontSize: '14px', color: '#434343' }}
            className="dark:text-white"
          >
            From
          </div>
          <div
            style={{
              display: 'flex',
              flexFlow: 'row nowrap',
            }}
          >
            <div>
              <InputNumber
                bordered={false}
                placeholder="0.00"
                style={{ ...styles.input }}
                onChange={setFromAmount}
                value={fromAmount}
                className="dark:text-white"
              />
              <Text
                style={{ fontWeight: '600', color: '#434343' }}
                className="dark:text-white"
              >
                {fromTokenAmountUsd}
              </Text>
            </div>
            <Button
              style={{
                height: 'fit-content',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '0.6rem',
                padding: '5px 10px',
                fontWeight: '500',
                fontSize: '17px',
                gap: '7px',
                border: 'none',
                backgroundColor: '#F6BA3F',
                color: 'white',
              }}
              onClick={() => setFromModalActive(true)}
            >
              {fromToken ? (
                <Image
                  src={
                    fromToken?.logoURI ||
                    'https://etherscan.io/images/main/empty-token.png'
                  }
                  alt="nologo"
                  width="30px"
                  preview={false}
                  style={{ borderRadius: '15px' }}
                />
              ) : (
                <span>Select a token</span>
              )}
              <span>{fromToken?.symbol}</span>
              <Arrow />
            </Button>
          </div>
        </Card>
        <div
          style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
        >
          <ArrowDownOutlined />
        </div>
        <Card
          style={{ borderRadius: '1rem' }}
          bodyStyle={{ padding: '0.8rem' }}
        >
          <div
            style={{ marginBottom: '5px', fontSize: '14px', color: '#434343' }}
            className="dark:text-white"
          >
            To
          </div>
          <div
            style={{
              display: 'flex',
              flexFlow: 'row nowrap',
            }}
          >
            <div>
              <InputNumber
                bordered={false}
                placeholder="0.00"
                style={styles.input}
                readOnly
                className="dark:text-white"
                value={
                  quote
                    ? parseFloat(
                        Moralis?.Units?.FromWei(
                          quote?.toTokenAmount,
                          quote?.toToken?.decimals
                        ).toString()
                      ).toFixed(6)
                    : ''
                }
              />
              <Text style={{ fontWeight: '600', color: '#434343' }}>
                {toTokenAmountUsd}
              </Text>
            </div>
            <Button
              style={{
                height: 'fit-content',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: '0.6rem',
                padding: '5px 10px',
                fontWeight: '500',
                fontSize: '17px',
                gap: '7px',
                border: 'none',
                backgroundColor: '#F6BA3F',
              }}
              onClick={() => setToModalActive(true)}
              type={toToken ? 'default' : 'primary'}
            >
              {toToken ? (
                <Image
                  src={
                    toToken?.logoURI ||
                    'https://etherscan.io/images/main/empty-token.png'
                  }
                  alt="nologo"
                  width="30px"
                  preview={false}
                  style={{ borderRadius: '15px' }}
                />
              ) : (
                <span>Select a token</span>
              )}
              <span>{toToken?.symbol}</span>
              <Arrow />
            </Button>
          </div>
        </Card>
        {quote && (
          <div>
            <Text
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '15px',
                color: '#434343',
                marginTop: '8px',
                padding: '0 10px',
              }}
            >
              Estimated Gas: <Text>{quote?.estimatedGas}</Text>
            </Text>
            <PriceSwap />
          </div>
        )}
        <Button
          type="primary"
          size="large"
          style={{
            width: '100%',
            marginTop: '15px',
            borderRadius: '0.6rem',
            height: '50px',
          }}
          className="dark:text-black"
          onClick={() => trySwap(currentTrade)}
          disabled={!ButtonState.isActive}
        >
          {ButtonState.text}
        </Button>
      </Card>
      <Modal
        title="Select a token"
        visible={isFromModalActive}
        onCancel={() => setFromModalActive(false)}
        bodyStyle={{ padding: 0 }}
        width="450px"
        footer={null}
      >
        <InchModal
          open={isFromModalActive}
          onClose={() => setFromModalActive(false)}
          setToken={setFromToken}
          tokenList={toTokens}
        />
      </Modal>
      <Modal
        title="Select a token"
        visible={isToModalActive}
        onCancel={() => setToModalActive(false)}
        bodyStyle={{ padding: 0 }}
        width="450px"
        footer={null}
      >
        <InchModal
          open={isToModalActive}
          onClose={() => setToModalActive(false)}
          setToken={setToToken}
          tokenList={toTokens}
        />
      </Modal>
    </>
  );
};
const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default DSX;
