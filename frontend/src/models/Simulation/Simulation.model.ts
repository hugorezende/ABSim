import { AgentModel } from "../Agent/Agent.model";

export enum SimulationStatus {
  SCHEDULED = 1,
  RUNNING = 2,
  PAUSED = 3,
  FINISHED = 4,
  CANCELLED = 5,
  ERROR = 6,
}

export const simulationStatusString = [
  "",
  "Scheduled",
  "Running",
  "Paused",
  "Finished",
  "Cancelled",
  "Error",
];

interface SubstrateModel {
  id: string;
  name: string;
  diffCoeff: number;
  decayRate: number;
}

export interface AgentSubtrateAssociationModel {
  id: string;
  subtrate: SubstrateModel;
  agent: AgentModel;
  type: "release" | "uptake";
  quantity: number;
  saturation: number;
  chemoAttr: number;
}

interface AgentAgentAssociationModel {
  id: string;
  agentId1: AgentModel;
  agentId2: AgentModel;
  bidingStrength: number;
}

export interface SimulationModel {
  id?: number;
  status?: SimulationStatus;
  createdDatetime?: Date;
  endDatetime?: Date;
  owner?: number;
  simulationBatchId?: number;
  finishedPercentage?: number;

  title: string;
  tags?: string[];
  dimensions: {
    resolution: number;
    x: number;
    y: number;
    z?: number;
  };
  AgentSubtrateAssociation: AgentSubtrateAssociationModel[];
  AgentAgentAssociation: AgentAgentAssociationModel[];
  mechanics: {
    value: number;
    time: "ms" | "sec" | "min" | "hour" | "day";
  };
  cellCycle: {
    value: number;
    time: "ms" | "sec" | "min" | "hour" | "day";
  };
  snapShot: {
    value: number;
    time: "ms" | "sec" | "min" | "hour" | "day";
  };
  diffusion: {
    value: number;
    time: "ms" | "sec" | "min" | "hour" | "day";
  };
  maxTimeRun: {
    value: number;
    time: "ms" | "sec" | "min" | "hour" | "day";
  };
}
