import { Button, Col, message, Row, Select } from "antd";
import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import BaseLayout from "../../components/base/Layout/BaseLayout";
import { PageWrapper } from "../../components/base/StyledComponents/PageWrapper";
import { AgentModel } from "../../models/Agent/Agent.model";
import {
  AgentSubtrateAssociationModel,
  SimulationModel,
} from "../../models/Simulation/Simulation.model";
import { SubstrateModel } from "../../models/Substrate/Substrate.model";
import SimulationsService from "../../services/Simulations/Simulations.service";
import CreateAgentModal from "./Modals/CreateAgentModal";
import CreateSubstrateModal from "./Modals/CreateSubstrateModal";
import AgentSubstrateAssociationModal from "./Modals/SubstrateAgentAssociationModal";

interface ICreateSimulationPageProps {}

const agents: AgentModel[] = [
  { id: "1", name: "Cell Type A", cycleLength: 50, velocity: 4592 },
  { id: "2", name: "Cell Type B", cycleLength: 10, velocity: 1000 },
  { id: "3", name: "Cell Type C", cycleLength: 289, velocity: 456 },
];

const substrates: SubstrateModel[] = [
  { id: "1", name: "Oxigen", diffCoeff: 1, decayRate: 1000 },
  { id: "2", name: "Glucose", diffCoeff: 95, decayRate: 1000 },
  { id: "3", name: "Sucrose", diffCoeff: 33, decayRate: 1000 },
  { id: "4", name: "Glucose + Methanol", diffCoeff: 20, decayRate: 1000 },
];

interface CreateNewSimulationStatus {
  simulationTitle?: string;
  agents: AgentModel[];
}

const CreateSimulationPage: React.FunctionComponent<ICreateSimulationPageProps> = (
  props
) => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    control,
    errors,
  } = useForm<SimulationModel>();

  const [newSimulationState, setNewSimulationState] = useState<{
    dimension: number;
    selectedSubstrate: string;
    selectedAgent: string;
    agents: AgentModel[];
    agentToSubstrate: AgentSubtrateAssociationModel[];
  }>({
    dimension: 2,
    selectedSubstrate: "",
    selectedAgent: "",
    agents: [],
    agentToSubstrate: [],
  });

  const [availableSubstrates, setAvailableSubstrates] = useState<
    SubstrateModel[]
  >([
    { id: "1", name: "Oxigen", diffCoeff: 1, decayRate: 1000 },
    { id: "2", name: "Glucose", diffCoeff: 95, decayRate: 1000 },
    { id: "3", name: "Sucrose", diffCoeff: 33, decayRate: 1000 },
    { id: "4", name: "Glucose + Methanol", diffCoeff: 20, decayRate: 1000 },
  ]);

  const [availableAgents, setAvailableAgents] = useState<AgentModel[]>([
    { id: "1", name: "Cell Type A", cycleLength: 50, velocity: 4592 },
    { id: "2", name: "Cell Type B", cycleLength: 10, velocity: 1000 },
    { id: "3", name: "Cell Type C", cycleLength: 289, velocity: 456 },
  ]);

  // Modal states
  const [modalState, setModalState] = useState({
    createSubstrate: false,
    createAgent: false,
    createSubsAgentAssociation: false,
  });

  const [selectedComponents, setSelectedComponents] = useState<{
    aToS_agent: AgentModel | undefined;
    aToS_substrate: SubstrateModel | undefined;
  }>({
    aToS_agent: undefined,
    aToS_substrate: undefined,
  });

  const history = useHistory();
  const createNewSimulation = (data: any) => {
    //console.log(data);
    SimulationsService.create(data).then((res) => {
      if (res.success) {
        history.push("/simulation");
      } else {
        message.error("Something wrong has occured");
      }
    });
  };
  const createSubstrate = (substrate: SubstrateModel) => {
    setAvailableSubstrates([...availableSubstrates, substrate]);
    setNewSimulationState({
      ...newSimulationState,
      selectedSubstrate: substrate.id,
    });
  };

  const createAgent = (agent: AgentModel) => {
    setAvailableAgents([...availableAgents, agent]);
  };

  const addAgent = () => {
    const selectedAgent = availableAgents.find(
      (item) => item.id === getValues("selectedAgent")
    );

    if (selectedAgent) {
      setNewSimulationState({
        ...newSimulationState,
        agents: [...newSimulationState.agents, selectedAgent],
      });
    }
  };

  const removeAgent = (agent: AgentModel) => {
    setNewSimulationState({
      ...newSimulationState,
      agents: newSimulationState.agents.filter((i) => i.id !== agent.id),
    });
  };

  const addAgentToSubstrate = (
    agentToSubstrate: AgentSubtrateAssociationModel
  ) => {
    setNewSimulationState({
      ...newSimulationState,
      agentToSubstrate: [
        ...newSimulationState.agentToSubstrate,
        agentToSubstrate,
      ],
    });
  };

  const removeAgentToSubs = (id: string) => {
    setNewSimulationState({
      ...newSimulationState,
      agentToSubstrate: [
        ...newSimulationState.agentToSubstrate.filter((item) => item.id !== id),
      ],
    });
  };

  return (
    <BaseLayout>
      <div>
        <h1>Create New Simulation</h1>
        <PageWrapper>
          <form onSubmit={handleSubmit(createNewSimulation)}>
            <Wrapper>
              <h3>General Data</h3>
              <Row>
                <Col span={12}>
                  <div className='form-group'>
                    <label>
                      Simulation Title *
                      <input
                        type='text'
                        name='title'
                        ref={register({ required: true })}
                      />
                      {errors.title && <span>This field is required</span>}
                    </label>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <div className='form-group'>
                    <label>
                      Tags
                      <input type='text' name='tags' ref={register}></input>
                    </label>
                  </div>
                </Col>
              </Row>
            </Wrapper>
            <Wrapper>
              <h3>Dimensions</h3>
              <Row>
                <Col span={6}>
                  <div className='form-group'>
                    <label>
                      Simulation Dimensions
                      <select
                        value={newSimulationState.dimension}
                        onChange={(e) =>
                          setNewSimulationState({
                            ...newSimulationState,
                            dimension: parseInt(e.currentTarget.value),
                          })
                        }
                      >
                        <option value={2}>2D</option>
                        <option value={3}>3D</option>
                      </select>
                    </label>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col span={6}>
                  <div className='form-group'>
                    <label>
                      Cell Resolution
                      <input
                        type='text'
                        name='dimensions.resolution'
                        ref={register}
                      ></input>
                    </label>
                  </div>
                </Col>

                <Col span={6}>
                  <div className='form-group'>
                    <label>
                      X Size
                      <input
                        type='text'
                        name='dimensions.x'
                        ref={register}
                      ></input>
                    </label>
                  </div>
                </Col>

                <Col span={6}>
                  <div className='form-group'>
                    <label>
                      Y Size
                      <input
                        type='text'
                        name='dimensions.y'
                        ref={register}
                      ></input>
                    </label>
                  </div>
                </Col>
                {newSimulationState.dimension === 3 && (
                  <Col span={6}>
                    <div className='form-group'>
                      <label>
                        Z Size
                        <input
                          type='text'
                          name='dimensions.z'
                          ref={register}
                        ></input>
                      </label>
                    </div>
                  </Col>
                )}
              </Row>
            </Wrapper>

            <Wrapper>
              <h3>Substrate</h3>
              <Row>
                <Col span={6}>
                  <div className='form-group'>
                    <div>Substrate Type</div>
                    <Select
                      ref={register}
                      style={{ width: "200px" }}
                      value={
                        newSimulationState.selectedSubstrate
                          ? newSimulationState.selectedSubstrate
                          : undefined
                      }
                      onChange={(e) =>
                        setNewSimulationState({
                          ...newSimulationState,
                          selectedSubstrate: e,
                        })
                      }
                      showSearch
                      optionFilterProp='data-label'
                    >
                      {availableSubstrates.map((substrate) => {
                        return (
                          <Select.Option
                            value={substrate.id}
                            key={`${substrate.id}`}
                            data-label={substrate.name}
                          >
                            {substrate.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </div>
                  {newSimulationState.selectedSubstrate !== "" && (
                    <GroupList>
                      <div>
                        <h4>Substrate Details:</h4>
                        <div className='t-italic'>
                          {
                            availableSubstrates.find(
                              (item) =>
                                item.id === newSimulationState.selectedSubstrate
                            )?.name
                          }
                        </div>
                        <div>
                          diff coeff:{" "}
                          {
                            availableSubstrates.find(
                              (item) =>
                                item.id === newSimulationState.selectedSubstrate
                            )?.diffCoeff
                          }
                        </div>
                        <div>
                          Decay rate:{" "}
                          {
                            availableSubstrates.find(
                              (item) =>
                                item.id === newSimulationState.selectedSubstrate
                            )?.decayRate
                          }
                        </div>
                      </div>
                    </GroupList>
                  )}
                  <div className='form-group'>
                    <Button
                      type='primary'
                      size='small'
                      ghost
                      onClick={() => {
                        setModalState({
                          ...modalState,
                          createSubstrate: true,
                        });
                      }}
                    >
                      Create New Substrate
                    </Button>
                  </div>
                </Col>
              </Row>
            </Wrapper>

            <Wrapper>
              <Row>
                <Col span={24}>
                  <h3>Agents</h3>
                </Col>

                <div className='form-group'>
                  <Controller
                    name='selectedAgent'
                    id='selectedAgent'
                    control={control}
                    ref={register}
                    style={{ width: "200px" }}
                    showSearch
                    render={(property) => (
                      <Select
                        style={{ width: "200px" }}
                        showSearch
                        onChange={(e) => {
                          property.onChange(e);
                        }}
                        optionFilterProp='data-label'
                      >
                        {availableAgents.map((agent) => {
                          return (
                            <Select.Option
                              data-label={agent.name}
                              value={agent.id}
                              key={`agent_${agent.id}`}
                            >
                              {agent.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    )}
                  ></Controller>{" "}
                  <Button type='primary' onClick={() => addAgent()}>
                    Add Agent
                  </Button>{" "}
                  <Button
                    type='primary'
                    ghost
                    onClick={() => {
                      setModalState({
                        ...modalState,
                        createAgent: true,
                      });
                    }}
                  >
                    Create new agent
                  </Button>
                </div>

                <GroupList>
                  <div>
                    <h4>Agent Details:</h4>
                    <div className='t-italic'>Agent 01</div>
                    <div>Cellcycle length: 5000</div>
                    <div>Velocity: 2000</div>
                  </div>
                </GroupList>

                <GroupList>
                  <Row className='table-header'>
                    <Col span={12}>
                      <div className='item t-italic'>Agent Name</div>
                    </Col>
                    <Col span={4}>
                      <div className='item t-italic'>Cellcycle length</div>
                    </Col>
                    <Col span={4}>
                      <div className='item t-italic'>Velocity</div>
                    </Col>
                    <Col span={4}></Col>
                  </Row>

                  {newSimulationState.agents.map((agent: AgentModel) => (
                    <Row className='table-row'>
                      <Col span={12}>
                        <div className='item t-italic'>{agent.name}</div>
                      </Col>
                      <Col span={4}>
                        <div className='item t-italic'>{agent.cycleLength}</div>
                      </Col>
                      <Col span={4}>
                        <div className='item t-italic'>{agent.velocity}</div>
                      </Col>
                      <Col span={4}>
                        <Button
                          size='small'
                          danger
                          onClick={() => removeAgent(agent)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  ))}
                </GroupList>
              </Row>
            </Wrapper>

            <Wrapper>
              <Row>
                <Col span={24}>
                  <h3>Agent to Substrate Association</h3>
                  <p className='t-italic'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure molestias suscipit quod, nesciunt laborum, dicta
                    explicabo quae quidem quisquam ab ipsum fugiat adipisci
                    iusto facilis fuga facere? Itaque, soluta earum!
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={8}>Agent</Col>
                <Col span={1}></Col>
                <Col span={8}>Substrate</Col>
                <Col span={8}></Col>
              </Row>
              <Row gutter={20} style={{ marginBottom: "20px" }}>
                <Col span={8}>
                  <Select
                    ref={register}
                    style={{ width: "100%" }}
                    value={selectedComponents.aToS_agent?.id}
                    onChange={(e) => {
                      setSelectedComponents({
                        ...selectedComponents,
                        aToS_agent: availableAgents.find(
                          (agent) => agent.id === e
                        ),
                      });
                    }}
                    showSearch
                    optionFilterProp='data-label'
                  >
                    {availableAgents.map((agent) => {
                      return (
                        <Select.Option
                          data-label={agent.name}
                          value={agent.id}
                          key={`agent_association_${agent.id}`}
                        >
                          {agent.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Col>

                <Col span={1}>{`→`}</Col>

                <Col span={8}>
                  <Select
                    ref={register}
                    style={{ width: "100%" }}
                    defaultValue={selectedComponents.aToS_substrate?.id}
                    onChange={(e) => {
                      setSelectedComponents({
                        ...selectedComponents,
                        aToS_substrate: availableSubstrates.find(
                          (substrate) => substrate.id === e
                        ),
                      });
                    }}
                    showSearch
                    optionFilterProp='data-label'
                  >
                    {availableSubstrates.map((substrate) => {
                      return (
                        <Select.Option
                          data-label={substrate.name}
                          value={substrate.id}
                          key={`substrate_association_${substrate.id}`}
                        >
                          {substrate.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Col>

                <Col span={6}>
                  <Button
                    onClick={() => {
                      setModalState({
                        ...modalState,
                        createSubsAgentAssociation: true,
                      });
                    }}
                  >
                    Add
                  </Button>
                </Col>
              </Row>

              <GroupList>
                <Row className='table-header'>
                  <Col span={6}>
                    <div className='item t-italic'>Agent</div>
                  </Col>
                  <Col span={6}>
                    <div className='item t-italic'>Substrate</div>
                  </Col>
                  <Col span={6}>
                    <div className='item t-italic'>Type</div>
                  </Col>
                  <Col span={4}></Col>
                </Row>

                {newSimulationState.agentToSubstrate.map(
                  (agentToSubs, index) => (
                    <Row className='table-row'>
                      <Col span={6}>
                        <div className='item t-italic'>
                          {agentToSubs.agent.name}
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className='item t-italic'>
                          {agentToSubs.subtrate.name}
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className='item t-italic'>{agentToSubs.type}</div>
                      </Col>
                      <Col span={4}>
                        <Button
                          size='small'
                          danger
                          onClick={() => removeAgentToSubs(agentToSubs.id)}
                        >
                          Delete
                        </Button>{" "}
                      </Col>
                    </Row>
                  )
                )}
              </GroupList>
            </Wrapper>

            <Wrapper>
              <Row>
                <Col span={24}>
                  <h3>Agent to Agent Association</h3>
                  <p className='t-italic'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure molestias suscipit quod, nesciunt laborum, dicta
                    explicabo quae quidem quisquam ab ipsum fugiat adipisci
                    iusto facilis fuga facere? Itaque, soluta earum!
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={8}>Agent</Col>
                <Col span={1}></Col>
                <Col span={8}>Agent</Col>
                <Col span={8}></Col>
              </Row>
              <Row gutter={20} style={{ marginBottom: "20px" }}>
                <Col span={8}>
                  <Select ref={register} style={{ width: "100%" }} showSearch>
                    <Select.Option value='oxigen'>Oxygen</Select.Option>
                    <Select.Option value='glucose'>Glucose</Select.Option>
                  </Select>
                </Col>

                <Col span={1}>{`→`}</Col>

                <Col span={8}>
                  <Select ref={register} style={{ width: "100%" }} showSearch>
                    <Select.Option value='Agent 01'>Agent 01</Select.Option>
                    <Select.Option value='Agent 02'>Agent 02</Select.Option>
                    <Select.Option value='Agent 03'>Agent 03</Select.Option>
                    <Select.Option value='Agent 04'>Agent 04</Select.Option>
                  </Select>
                </Col>

                <Col span={6}>
                  <Button>Add</Button>
                </Col>
              </Row>

              <GroupList>
                <Row className='table-header'>
                  <Col span={6}>
                    <div className='item t-italic'>Agent</div>
                  </Col>
                  <Col span={6}>
                    <div className='item t-italic'>Agent</div>
                  </Col>
                  <Col span={4}></Col>
                </Row>

                {[...Array(1)].map((x, i) => (
                  <Row className='table-row'>
                    <Col span={6}>
                      <div className='item t-italic'>Substrate{i}</div>
                    </Col>
                    <Col span={6}>
                      <div className='item t-italic'>Agent{i}</div>
                    </Col>
                    <Col span={4}>
                      <Button size='small' danger>
                        Delete
                      </Button>{" "}
                      <Button size='small' type='primary' ghost>
                        Edit
                      </Button>
                    </Col>
                  </Row>
                ))}
              </GroupList>
            </Wrapper>

            <Wrapper>
              <Row>
                <Col span={24}>
                  <h3>Time Settings</h3>
                  <p className='t-italic'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iure molestias suscipit quod, nesciunt laborum, dicta
                    explicabo quae quidem quisquam ab ipsum fugiat adipisci
                    iusto facilis fuga facere? Itaque, soluta earum!
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <div className='form-group'>
                    Mechanics
                    <div style={{ display: "flex" }}>
                      <input
                        type='number'
                        pattern='\d*'
                        name='param1'
                        ref={register}
                        style={{ marginRight: "5px" }}
                      ></input>
                      <select>
                        <option>ms</option>
                        <option>sec</option>
                        <option>min</option>
                        <option>hour</option>
                        <option>day</option>
                      </select>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <div className='form-group'>
                    Cellcycle
                    <div style={{ display: "flex" }}>
                      <input
                        type='text'
                        name='param1'
                        ref={register}
                        style={{ marginRight: "5px" }}
                      ></input>
                      <select>
                        <option>ms</option>
                        <option>sec</option>
                        <option>min</option>
                        <option>hour</option>
                        <option>day</option>
                      </select>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <div className='form-group'>
                    Snapshot
                    <div style={{ display: "flex" }}>
                      <input
                        type='text'
                        name='param1'
                        ref={register}
                        style={{ marginRight: "5px" }}
                      ></input>
                      <select>
                        <option>ms</option>
                        <option>sec</option>
                        <option>min</option>
                        <option>hour</option>
                        <option>day</option>
                      </select>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <div className='form-group'>
                    Difusion
                    <div style={{ display: "flex" }}>
                      <input
                        type='text'
                        name='param1'
                        ref={register}
                        style={{ marginRight: "5px" }}
                      ></input>
                      <select>
                        <option>ms</option>
                        <option>sec</option>
                        <option>min</option>
                        <option>hour</option>
                        <option>day</option>
                      </select>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col span={12}>
                  <div className='form-group'>
                    Maximum Timerun
                    <div style={{ display: "flex" }}>
                      <input
                        type='text'
                        name='param1'
                        ref={register}
                        style={{ marginRight: "5px" }}
                      ></input>
                      <select>
                        <option>ms</option>
                        <option>sec</option>
                        <option>min</option>
                        <option>hour</option>
                        <option>day</option>
                      </select>
                    </div>
                  </div>
                </Col>
              </Row>
            </Wrapper>

            <Row style={{ marginTop: "50px" }}>
              <Col span={24}>
                <Button type='primary' htmlType='submit'>
                  Create New Simulation
                </Button>
              </Col>
            </Row>
          </form>
        </PageWrapper>
      </div>

      <CreateSubstrateModal
        isVisible={modalState.createSubstrate}
        handleOk={() => {
          setModalState({ ...modalState, createSubstrate: false });
        }}
        handleCancel={() => {
          setModalState({ ...modalState, createSubstrate: false });
        }}
        createSubstrate={createSubstrate}
      />

      <CreateAgentModal
        isVisible={modalState.createAgent}
        handleOk={() => {
          setModalState({ ...modalState, createAgent: false });
        }}
        handleCancel={() => {
          setModalState({ ...modalState, createAgent: false });
        }}
        createAgent={createAgent}
      />

      <AgentSubstrateAssociationModal
        isVisible={modalState.createSubsAgentAssociation}
        handleOk={() => {
          setModalState({ ...modalState, createSubsAgentAssociation: false });
        }}
        handleCancel={() => {
          setModalState({ ...modalState, createSubsAgentAssociation: false });
        }}
        addAgentToSubstrate={addAgentToSubstrate}
        agent={selectedComponents.aToS_agent!}
        substrate={selectedComponents.aToS_substrate!}
      />
    </BaseLayout>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  width: 100%;
  background: #1d1c1c;
  border-radius: 10px;
  border: solid 1px #2d2d2d;
  margin-bottom: 20px;
`;

const GroupList = styled.div`
  padding: 20px;
  width: 100%;
  background: #1d1c1c;
  border-radius: 10px;
  border: solid 1px #2d2d2d;
  margin-bottom: 20px;
`;

export default CreateSimulationPage;
