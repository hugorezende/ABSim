import Modal from "antd/lib/modal/Modal";
import * as React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { AgentModel } from "../../../models/Agent/Agent.model";

interface ICreateAgentModalProps {
  isVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  createAgent: (agent: AgentModel) => void;
}

const CreateAgentModal: React.FunctionComponent<ICreateAgentModalProps> = (
  props
) => {
  const { isVisible, handleOk, handleCancel, createAgent } = props;
  const { register, handleSubmit, getValues, reset } = useForm();
  return (
    <Modal
      title='Create substrate'
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={"Create"}
      footer={null}
    >
      <form
        onSubmit={handleSubmit((data) => {
          createAgent({
            id: uuidv4(),
            name: getValues("agentName"),
            cycleLength: getValues("cycleLength"),
            velocity: getValues("velocity"),
          });
          reset();
          handleOk();
        })}
      >
        <div className='form-group'>
          <label>
            Agent Name
            <input
              type='text'
              name='agentName'
              ref={register({ required: true })}
            ></input>
          </label>
        </div>

        <div className='form-group'>
          <label>
            Cycle Length
            <input
              type='number'
              name='cycleLength'
              ref={register({ required: true })}
            ></input>
          </label>
        </div>

        <div className='form-group'>
          <label>
            Velocity
            <input
              type='number'
              name='velocity'
              ref={register({ required: true })}
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

export default CreateAgentModal;
