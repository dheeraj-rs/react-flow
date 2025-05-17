import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import InputListClose from './InputListClose';
import useStore from '../../../Test/store';
import { getNodeDetails, handleKeyPressForNumber } from '../../../../common/helpers/utils';
import InputList from './InputList';

function ShortcutModal({ isVisible, onSelect, onUpdate, isDataSubmiting }) {
  const { show, setShow, flowNodes } = useStore();

  const validate = (data) => {
    const errors = {};
    if (data.keyList?.length) {
      const keyErrors = {};
      const seen = new Set();
      data.keyList.forEach((value, index) => {
        const strValue = String(value).trim();
        if (strValue === '') {
          keyErrors[index] = 'input value is required';
        } else if (seen.has(strValue)) {
          keyErrors[index] = 'duplicate value is not allowed';
        } else {
          const validInput = /^[1-9#0*]+$/.test(strValue);
          if (!validInput) {
            keyErrors[index] = 'only digits 1-9, #, 0, * are allowed';
          } else {
            seen.add(strValue);
          }
        }
      });
      if (Object.keys(keyErrors).length) {
        errors.keyList = keyErrors;
      }
    }
    if (!data.timeout) {
      errors.timeout = 'timeout is required';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      keyList: [10],
      timeout: 10,
    },
    validate,
    validateOnMount: true,
    onSubmit: () => {
      if (show?.actionType === 'edit-node') {
        onUpdate({
          formik,
          nodeId: show?.nodeId,
          details: {
            keyList: formik.values.keyList,
            timeout: formik.values.timeout,
          },
        });
      } else {
        onSelect({
          formik,
          prevHandleId: show?.prevHandleId,
          prevNodeId: show?.prevNodeId,
          type: 'shortcut',
          details: {
            keyList: formik.values.keyList,
            timeout: formik.values.timeout,
          },
        });
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    setShow({ isVisible: false, type: '' });
  };

  const updateValue = (value, index) => {
    const updatedArray = [...formik.values.keyList];
    if (value) {
      const validInput = /^[1-9#0*]+$/.test(value);
      if (validInput) {
        updatedArray[index] = value;
        formik.setFieldTouched(`keyList[${index}]`, true, false);
      }
    } else {
      updatedArray[index] = '';
    }
    formik.setFieldValue('keyList', updatedArray);
  };

  const addNewInput = () => {
    formik.setFieldValue('keyList', [...formik.values.keyList, '']);
  };

  const deleteValue = (indexToDelete) => {
    const updatedArray = [...formik.values.keyList];
    updatedArray.splice(indexToDelete, 1);
    formik.setFieldValue('keyList', updatedArray);
  };

  useEffect(() => {
    if (show?.actionType === 'edit-node' && show?.nodeId && show?.type === 'shortcut') {
      const nodeDetails = getNodeDetails(show?.nodeId, flowNodes);
      formik.setFieldValue('keyList', nodeDetails?.details?.keyList);
      formik.setFieldValue('timeout', nodeDetails?.details?.timeout);
    }
  }, [show?.actionType, show?.nodeId, flowNodes]);

  if (isVisible) {
    return (
      <>
        <div
          className="modal fade show"
          aria-labelledby="exampleModalLabel"
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
                    const hasError = formik.errors.keyList && formik.errors.keyList[index];
                    const errorMessage = hasError ? formik.errors.keyList[index] : null;
                    if (index === 0) {
                      return (
                        <div key={index}>
                          <InputList
                            index={index}
                            value={value}
                            onChange={(e) => {
                              if (e.target.value.length <= 3) {
                                updateValue(e.target.value, index);
                              }
                            }}
                            formik={formik}
                            hasError={
                              errorMessage && (formik.touched.keyList || formik.submitCount > 0)
                            }
                            hasDuplicateError={
                              value !== '' &&
                              formik.values.keyList.filter((v) => v === value).length > 1
                            }
                          />
                          {errorMessage && (formik.touched.keyList || formik.submitCount > 0) && (
                            <div className="text-danger mb-2">{errorMessage}</div>
                          )}
                        </div>
                      );
                    }
                    return (
                      <div key={index}>
                        <InputListClose
                          closeClass="close-one"
                          index={index}
                          value={value}
                          onChange={(e) => {
                            if (e.target.value.length <= 3) {
                              updateValue(e.target.value, index);
                            }
                          }}
                          deleteValue={() => {
                            deleteValue(index);
                          }}
                          formik={formik}
                          hasError={
                            errorMessage && (formik.touched.keyList || formik.submitCount > 0)
                          }
                          hasDuplicateError={
                            value !== '' &&
                            formik.values.keyList.filter((v) => v === value).length > 1
                          }
                        />
                        {errorMessage && (formik.touched.keyList || formik.submitCount > 0) && (
                          <div className="text-danger mb-2">{errorMessage}</div>
                        )}
                      </div>
                    );
                  })}
                  <span
                    className="color-blue-active mt-3 d-inline-block cursor-pointer add-two"
                    onClick={() => {
                      addNewInput();
                    }}
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
                            onChange={(e) => {
                              const { value } = e.target;
                              if (value.length <= 3) {
                                formik.handleChange(e);
                              }
                            }}
                            value={formik.values.timeout}
                            style={{
                              width: '50px',
                              border:
                                (formik.touched.timeout || formik.submitCount > 0) &&
                                formik.errors.timeout
                                  ? '1px solid red'
                                  : '1px solid #dee2e6',
                            }}
                          />
                        </span>
                        <span>Sec.</span>
                      </p>
                      {(formik.touched.timeout || formik.submitCount > 0) && (
                        <div className="text-danger mb-2">{formik.errors.timeout}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="timeslot-buttons mt-4 d-flex align-item-center">
                  <button
                    type="button"
                    className="btn bg-black fw-medium fs-14px text-white px-3 py-12px"
                    id="shortcutBtn"
                    onClick={formik.handleSubmit}
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
