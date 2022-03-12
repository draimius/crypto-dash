import React, { useState } from 'react';
import { Typography, Row, Col, Select, Card, Avatar } from 'antd';
import moment from 'moment';
import { useGetNewsQuery } from '../services/cyptoNewsApi';
import { useGetCoinsQuery } from '../services/cryptoApi';
const demoImage =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Option } = Select;
const { Text, Title } = Typography;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCoinsQuery(100);

  const { data: news } = useGetNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (!news?.value) return 'Loading...';

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              // filtering out the option so only shows the one selected
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin, i) => (
              <Option key={i} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {news?.value?.map((article, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card className="news-card" hoverable>
            <a href={article.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {article.name}
                </Title>
                <img
                  style={{
                    maxWidth: '80px',
                    maxHeight: '80px',
                    padding: '20px',
                  }}
                  src={article?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
              </div>
              <p>
                {article.description.length > 100
                  ? `${article.description.substring(0, 100)}...`
                  : article.description}
              </p>

              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      article?.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt="news provider"
                  />
                  <Text className="provider-name">
                    {article?.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(article.dataPublished).startOf('ss').fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
