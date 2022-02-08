import { Tabs } from 'antd';
import DEX from 'components/dex/Dex';

export const Swap = () => {
  return (
    <div className="md:pt-[55px]">
      <Tabs
        defaultActiveKey="1"
        style={{ alignItems: 'center' }}
        className="swap-model"
      >
        <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
          <DEX chain="eth" />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
          <DEX chain="bsc" />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span>Polygon</span>} key="3">
          <DEX chain="polygon" />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
