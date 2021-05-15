import Modal from "antd/lib/modal/Modal";
import * as React from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { SubstrateModel } from "../../../models/Substrate/Substrate.model";

interface ICreateSubstrateModalProps {
  isVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  createSubstrate: (substrate: SubstrateModel) => void;
}

const CreateSubstrateModal: React.FunctionComponent<ICreateSubstrateModalProps> = (
  props
) => {
  const { isVisible, handleOk, handleCancel, createSubstrate } = props;
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
          createSubstrate({
            id: uuidv4(),
            name: getValues("substrateName"),
            diffCoeff: getValues("diifCoeff"),
            decayRate: getValues("decayRate"),
          });
          reset();
          handleOk();
        })}
      >
        <div className='form-group'>
          <label>
            Substrate Name
            <input
              type='text'
              name='substrateName'
              ref={register({ required: true })}
            ></input>
          </label>
        </div>

        <div className='form-group'>
          <label>
            Diff coefficient
            <input
              type='number'
              name='diifCoeff'
              ref={register({ required: true })}
            ></input>
          </label>
        </div>

        <div className='form-group'>
          <label>
            Decay rate
            <input
              type='number'
              name='decayRate'
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

export default CreateSubstrateModal;
