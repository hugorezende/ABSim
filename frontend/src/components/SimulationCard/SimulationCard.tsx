import { Progress } from "antd";
import * as React from "react";
import styled from "styled-components";
import {
  SimulationModel,
  SimulationStatus,
  simulationStatusString,
} from "../../models/Simulation/Simulation.model";

interface ISimulationCardProps {
  simulation: SimulationModel;
}

const SimulationCard: React.FunctionComponent<ISimulationCardProps> = (
  props
) => {
  const { simulation } = props;
  return (
    <CardWrapper>
      <div className='title'>Simulation #{simulation.id}</div>
      <div className='status'>
        {simulation.status === SimulationStatus.RUNNING &&
          `${simulationStatusString[simulation.status]} ${
            simulation.finishedPercentage
          }% done`}
        {simulation.status === SimulationStatus.SCHEDULED &&
          `${simulationStatusString[simulation.status]}`}
        {simulation.status === SimulationStatus.FINISHED &&
          `${simulationStatusString[simulation.status]}`}
      </div>
      <Progress
        strokeColor={{
          "0%": "#108ee9",
          "100%": "#87d068",
        }}
        percent={simulation.finishedPercentage}
        status={simulation.finishedPercentage === 100 ? "success" : "active"}
      />
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  width: 300px;
  height: 150px;
  background-color: #626262;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  margin: 10px;
  cursor: pointer;
  &:hover {
    background-color: #464646;
  }
  .title {
    font-size: 22px;
    font-weight: 700;
  }
  .status {
    margin-bottom: 20px;
  }
`;
export default SimulationCard;
