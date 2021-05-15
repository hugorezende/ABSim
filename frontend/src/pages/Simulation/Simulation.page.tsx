import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import BaseLayout from "../../components/base/Layout/BaseLayout";
import { PageWrapper } from "../../components/base/StyledComponents/PageWrapper";
import SimulationCard from "../../components/SimulationCard/SimulationCard";
import {
  SimulationModel,
  SimulationStatus,
} from "../../models/Simulation/Simulation.model";
import SimulationsService from "../../services/Simulations/Simulations.service";

interface ISimulationPageProps {}

// const simulationMock: SimulationModel = {
//   id: 1,
//   createdDatetime: new Date(),
//   finishedPercentage: 20,
//   status: SimulationStatus.RUNNING,
//   owner: 1,
// };
const SimulationPage: React.FunctionComponent<ISimulationPageProps> = (
  props
) => {
  const history = useHistory();
  const [simulationList, setSimulationList] = useState<SimulationModel[]>([]);
  const [updatedSimulationList, setUpdatedSimulationList] = useState<
    SimulationModel[]
  >([]);

  useEffect(() => {
    SimulationsService.list().then((res) => {
      if (res.success) {
        setSimulationList(res.data.simulations);
      }
    });
  }, []);

  // Request updated list of simulations with new status
  useEffect(() => {
    const interval = setInterval(() => {
      SimulationsService.list().then((res) => {
        if (res.success) {
          setUpdatedSimulationList(res.data.simulations);
        }
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BaseLayout>
      <div>
        <PageWrapper>
          <h1>Active Simulations</h1>
          <SimulationsWrapper>
            {simulationList.map((simulation: any) => {
              return (
                <SimulationCard
                  key={simulation.id}
                  simulation={
                    updatedSimulationList.find(
                      (sim) => sim.id === simulation.id
                    ) || simulation
                  }
                />
              );
            })}
            {/* <SimulationCard
              simulation={{
                ...simulationMock,
                finishedPercentage: 65,
                status: SimulationStatus.RUNNING,
              }}
            /> */}
            <SimulationCardNew onClick={() => history.push("/simulation/new")}>
              <div>+ New Simulation</div>
            </SimulationCardNew>
          </SimulationsWrapper>
        </PageWrapper>
      </div>
    </BaseLayout>
  );
};
const SimulationsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const SimulationCardNew = styled.div`
  width: 300px;
  height: 150px;
  border: dashed 2px #626262;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  margin: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 22px;
  justify-content: center;
`;
export default SimulationPage;
