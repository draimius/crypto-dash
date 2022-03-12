import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCoinsQuery } from '../services/cryptoApi';
import { CryptoDetails, News } from '../Components';

//destucture  component just so less code to write
const { Title } = Typography;
const Homepage = () => {
  // data what is return from api req, and isFetching redux state = our api query req previously defined in cryptoApi
  const { data, isFetching } = useGetCoinsQuery(10);
  //if fetching state is a boolean teling us wether its still getting the data or if its already got it

  //catches before ever reaching the render return below
  if (isFetching) return 'Loading...';
  //data being the return data then .data for key in return data then .stats another key withing dtat return moving into the dtat obj return
  const globalStats = data?.data?.stats;

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchange"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={globalStats.totalMarkets} />
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 CryptoCurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/crypto-details">Show More </Link>
        </Title>
      </div>
      <CryptoDetails simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3}>
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

//for the passed in prop of simplified (if you dont specify a value it defaults to true)

export default Homepage;
