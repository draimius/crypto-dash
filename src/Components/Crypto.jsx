import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import { Col, Row, Typography, Select } from 'antd';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

import {
  useGetCoinDetailsQuery,
  useGetCoinHistoryQuery,
} from '../services/cryptoApi';
import LineChart from './LineChart';
const { Title, Text } = Typography;
const { Option } = Select;

const Crypto = () => {
  //useParams take the id from the url and allows us access to it
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  //api request for the specified id that we get from params from the url and bam got it
  const { data, isFetching } = useGetCoinDetailsQuery(coinId);
  const { data: coinHistory } = useGetCoinHistoryQuery({ coinId, timePeriod });
  const coinData = data?.data?.coin;

  console.log(timePeriod);

  if (isFetching) return 'Loading...';

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  //very clever to create array of key value pairs where you format and pass in different data point from the data recieved
  //from the api request
  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${coinData.price && millify(coinData.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: coinData.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${coinData.volume && millify(coinData.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${coinData.marketCap && millify(coinData.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${millify(coinData.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: coinData.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: coinData.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${millify(coinData.supply.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${millify(coinData.supply.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {` ${coinData.name} (${coinData.symbol})`} Price
        </Title>
        <p>
          {coinData.name} live price in US dollars. View value statistics,
          market cap and supply
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>
      {/* here thinkig add in my own api seperate to get close to real time data for charts history ect... */}
      {/* dont thing we can get history from the current api  */}
      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(coinData?.price)}
        coinName={coinData?.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {coinData.name} value statistics
            </Title>
            <p>Overview showing statistics and details of {coinData.name}</p>
          </Col>
          {stats.map(({ icon, title, value }, i) => (
            <Col key={i} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text> {title} </Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other statistics
            </Title>
            <p>Overview showing the stats of all Cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }, i) => (
            <Col key={i} className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text> {title} </Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {coinData.name} ?
            {/* parsing and not just in another component because the value its self is all html  */}
            {HTMLReactParser(coinData.description)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {coinData.name} Links
          </Title>
          {coinData?.links.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default Crypto;
