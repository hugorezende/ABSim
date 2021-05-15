import { Card, Col, Row, Statistic } from "antd";
import { DotChartOutlined } from "@ant-design/icons";
import * as React from "react";
import BaseLayout from "../../components/base/Layout/BaseLayout";

interface IDashboardPageProps {}

const DashboardPage: React.FunctionComponent<IDashboardPageProps> = (props) => {
  return (
    <BaseLayout>
      <h1>Dashboard</h1>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title='Simulations Running'
              value={12}
              valueStyle={{ color: "#cddc39" }}
              prefix={<DotChartOutlined />}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title='Second  Statistic' value={22} />
          </Card>
        </Col>
      </Row>
    </BaseLayout>
  );
};

export default DashboardPage;
