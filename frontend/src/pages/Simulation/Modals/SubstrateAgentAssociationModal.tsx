import { Radio } from "antd";
import Modal from "antd/lib/modal/Modal";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import { Controller, useForm } from "react-hook-form";
import { AgentModel } from "../../../models/Agent/Agent.model";
import { AgentSubtrateAssociationModel } from "../../../models/Simulation/Simulation.model";
import { SubstrateModel } from "../../../models/Substrate/Substrate.model";

interface IAgentSubstrateAssociationModalProps {
  isVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  addAgentToSubstrate: (
    agentToSubstrate: AgentSubtrateAssociationModel
  ) => void;
  agent: AgentModel;
  substrate: SubstrateModel;
}

const AgentSubstrateAssociationModal: React.FunctionComponent<IAgentSubstrateAssociationModalProps> = (
  props
) => {
  const {
    isVisible,
    handleOk,
    handleCancel,
    agent,
    substrate,
    addAgentToSubstrate,
  } = props;

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    control,
    errors,
  } = useForm();

  return (
    <Modal
      title='Create Agent/Substrate Association'
      visible={isVisible}
      footer={null}
      onCancel={handleCancel}
      okText={"Create"}
    >
      <h3>
        {agent?.name} ➝ {substrate?.name}
      </h3>
      <p>This create association between Agent and Substrate</p>
      <form
        onSubmit={handleSubmit((data) => {
          handleOk.call(null);
          addAgentToSubstrate({
            id: uuidv4(),
            subtrate: substrate,
            agent: agent,
            quantity: getValues("quantity"),
            saturation: getValues("saturation"),
            type: getValues("associationType"),
            chemoAttr: getValues("chemoAttr"),
          });
        })}
      >
        <div className='form-group'>
          <Controller
            name='associationType'
            id='associationType'
            control={control}
            defaultValue='release'
            rules={{ required: true }}
            render={(property) => (
              <Radio.Group
                buttonStyle='solid'
                defaultValue='release'
                onChange={(e) => {
                  property.onChange(e.target.value);
                }}
              >
                <Radio.Button value={"release"}>Releases</Radio.Button>
                <Radio.Button value={"uptake"}>Uptake</Radio.Button>
              </Radio.Group>
            )}
          />
        </div>

        <div className='form-group'>
          <label>
            Quantity* (unit)
            <input
              type='number'
              step='any'
              name='quantity'
              ref={register({ required: true })}
              placeholder='0.001'
            ></input>
          </label>
        </div>

        <div className='form-group'>
          <label>
            Saturation*
            <input
              type='number'
              name='saturation'
              ref={register({ required: true })}
              min={0}
              max={100}
              placeholder='Value between 0-100'
            ></input>
          </label>
        </div>

        <div className='form-group'>
          <label>
            Chemo attr coefficient
            <input
              type='number'
              step='any'
              name='chemoAttr'
              ref={register({ required: true })}
              min={0}
              max={100}
              placeholder='Value between 0-100'
            ></input>
          </label>
        </div>
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <button
            className='ant-btn'
            style={{ marginRight: "10px" }}
            onClick={handleCancel}
            type='button'
          >
            Cancel
          </button>
          <button className='ant-btn ant-btn-primary' type='submit'>
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AgentSubstrateAssociationModal;
