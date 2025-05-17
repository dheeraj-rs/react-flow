import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import InputListClose from './InputListClose';
import useStore from '../../../Test/store';
import {
  getNodeDetails,
  handleKeyPressForNumber,
  isFormFieldValid,
} from '../../../../common/helpers/utils';
import InputList from './InputList';

function ShortcutModal({ isVisible, onSelect, onUpdate, isDataSubmiting }) {
  const { show, setShow, flowNodes } = useStore();

  const validate = (data) => {
    const errors = {};

    data.keyList?.forEach((e, index) => {
      if (e === '') {
        errors[`timeout-${index}`] = 'required';
      }
    });

    if (!data.timeout) {
      errors.timeout = 'required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      keyList: [10],
      timeout: 10,
      sourceIndex: 0,
      updateData: [{ key: '10', index: 0, sourceIndex: 0 }],
    },
    validate,
    onSubmit: () => {
      const submitData = {
        keyList: formik.values.keyList,
        timeout: formik.values.timeout,
        sourceIndex: formik.values.sourceIndex,
        updateData: formik.values.updateData,
      };

      if (show?.actionType === 'edit-node') {
        onUpdate({
          formik,
          nodeId: show?.nodeId,
          details: submitData,
          type: 'shortcut',
        });
      } else {
        onSelect({
          formik,
          prevHandleId: show?.prevHandleId,
          prevNodeId: show?.prevNodeId,
          type: 'shortcut',
          details: submitData,
        });
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setShow({ isVisible: false, type: '' });
  };

  const deleteValue = (indexToDelete) => {
    const updatedKeyList = formik.values.keyList.filter((_, index) => index !== indexToDelete);
    const updatedUpdateData = formik.values.updateData.filter(
      (item) => item.index !== indexToDelete
    );

    // Recalculate indices for remaining items
    const newUpdateData = updatedUpdateData.map((item, newIndex) => ({
      ...item,
      updateSourceIndex: newIndex,
    }));

    formik.setFieldValue('keyList', updatedKeyList);
    formik.setFieldValue('updateData', newUpdateData);
  };

  const addNewInput = () => {
    const newIndex = formik.values.updateData.length;
    formik.setFieldValue('keyList', [...formik.values.keyList, '']);
    formik.setFieldValue('updateData', [
      ...formik.values.updateData,
      { key: '', index: newIndex, updateSourceIndex: newIndex },
    ]);
  };

  const updateValue = (value, index) => {
    const updatedKeyList = [...formik.values.keyList];
    const updatedUpdateData = [...formik.values.updateData];
    const dataIndex = updatedUpdateData.findIndex((item) => item.index === index);

    if (value) {
      updatedKeyList[dataIndex] = parseInt(value, 10);
      updatedUpdateData[dataIndex] = {
        key: value,
        index,
        updateSourceIndex: dataIndex,
      };
    } else {
      updatedKeyList[dataIndex] = '';
      updatedUpdateData[dataIndex] = {
        key: '',
        index,
        updateSourceIndex: dataIndex,
      };
    }

    formik.setFieldValue('keyList', updatedKeyList);
    formik.setFieldValue('updateData', updatedUpdateData);
  };

  useEffect(() => {
    if (show?.actionType === 'edit-node' && show?.nodeId && show?.type === 'shortcut') {
      const nodeDetails = getNodeDetails(show?.nodeId, flowNodes);
      const keyList = nodeDetails?.details?.keyList || [];
      const updateData = keyList.map((key, index) => ({
        key: key.toString(),
        index,
      }));

      formik.setValues({
        keyList,
        updateData,
        timeout: nodeDetails?.details?.timeout || 10,
        sourceIndex: nodeDetails?.details?.sourceIndex || 0,
      });
    }
  }, [show?.actionType, show?.nodeId, show?.type, flowNodes]);

  if (isVisible) {
    return (
      <>
        <div
          className="modal fade show"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div
            className="modal-dialog hours-modal-outer modal-dialog-scrollable"
            style={{ maxWidth: '550px' }}
          >
            <div className="modal-content">
              <div className="modal-body hours-modal">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center gap-3">
                    <span>
                      <img src="/assets/call-flows-hours/hours.svg" alt="" />
                    </span>
                    <h5 className="fs-16px text-primary fw-500 m-0">Shortcut</h5>
                  </div>
                  <span className="cursor-pointer" data-bs-dismiss="modal" onClick={handleClose}>
                    <img src="/assets/call-flows-hours/X.svg" alt="" />
                  </span>
                </div>
                <p className="text-secondary fs-13px mb-4 mt-0">
                  The Shortcut component helps you fast and direct connection to a specific feature
                  with a set of input keys.
                </p>
                <h5 className="fs-13px mb-3 fw-normal">Input list </h5>

                <div className="mt-3 one-input">
                  {formik.values.keyList.map((value, index) => {
                    if (index === 0) {
                      return (
                        <InputList
                          key={index}
                          index={index}
                          value={value}
                          onChange={(e) => {
                            updateValue(e.target.value, index);
                          }}
                          formik={formik}
                        />
                      );
                    }
                    return (
                      <InputListClose
                        key={index}
                        closeclassName="close-one"
                        index={index}
                        value={value}
                        onChange={(e) => {
                          updateValue(e.target.value, index);
                        }}
                        deleteValue={() => {
                          deleteValue(index);
                        }}
                        formik={formik}
                      />
                    );
                  })}
                  <span
                    className="color-blue-active mt-3 d-inline-block cursor-pointer add-two"
                    onClick={addNewInput}
                  >
                    <img src="/assets/call-flows-hours/add-circle.svg" alt="" className="me-2" />
                    Add Input
                  </span>
                </div>

                <div className="rounded p-4 bg-seaShell mt-4">
                  <div className="d-flex gap-2 mt-2">
                    <div>
                      <p className="m-0 fs-13px d-flex align-items-center gap-2">
                        <span>Time out if the caller doesn’t input anything</span>
                        <span>
                          <input
                            type="text"
                            className="form-control bg-white"
                            name="timeout"
                            onKeyPress={handleKeyPressForNumber}
                            onChange={formik.handleChange}
                            value={formik.values.timeout}
                            style={
                              isFormFieldValid(formik, 'timeout')
                                ? { border: '1px solid red', width: '50px' }
                                : { width: '50px' }
                            }
                          />
                        </span>
                        <span>Sec.</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="timeslot-buttons mt-4 d-flex align-item-center">
                  <button
                    type="button"
                    className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
                    id="shortcutBtn"
                    onClick={formik.handleSubmit}
                    disabled={isDataSubmiting}
                  >
                    {isDataSubmiting ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    className="d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-3 py-12px ms-2"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show" />
      </>
    );
  }
}

export default ShortcutModal;
