import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Input } from 'antd';

import { useGetCoinsQuery } from '../services/cryptoApi';

const CryptoDetails = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  // why and how does just passing in a number to specify count effect the api request
  //so we can pass it in as a parameter in to the api request
  const { data: coinList, isFetching } = useGetCoinsQuery(count);

  //accessing the data returned from the api request via coinList set
  //check that data exsit then again api keys data and coins to access them
  const [coins, setCoins] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  //input on change that way it changes and updates and the useeffect run and filters the data all at same time
  //while you are searching
  useEffect(() => {
    const filteredData = coinList?.data?.coins?.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setCoins(filteredData);
  }, [searchTerm, coinList]);

  if (isFetching) return 'Loading...';

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLocaleLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-cointainer">
        {coins?.map((coin) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.uuid}>
            <Link key={coin.uuid} to={`/crypto/${coin.uuid}`}>
              <Card
                title={`${coin.rank}. ${coin.name}`}
                extra={<img className="crypto-image" src={coin.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(coin.price)}</p>
                <p>Market Cap: {millify(coin.marketCap)}</p>
                <p>Deily Change: {millify(coin.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CryptoDetails;
