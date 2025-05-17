import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import '../../styles/scss/components/subhead.scss';
import '../../styles/scss/pages/call-flows-custom.scss';
import '../../styles/scss/pages/call-flow-hours.scss';
import useStore from '../Test/store';
import { getFormErrorMessage, isFormFieldValid } from '../../common/helpers/utils';

function Subhead({ id = '', name = '', isPublished, status = '', formik, loading = false }) {
  const { setShow } = useStore();

  const handleClose = () => {
    formik.resetForm();
  };

  return (
    <div className="subhead-outer">
      <div className="rounded-2 bg-white shadow-3 filter-box p-3 py-2 d-flex align-items-center align-items-sm-start align-items-lg-center justify-content-between flex-wrap flex-sm-nowrap">
        <div className="d-flex gap-3 align-items-center align-items-top">
          <div className="d-none d-md-block">
            <span className="sunhead-back-arrow ">
              <Link to="/comm-voice-admin/call-flows">
                <img src="/assets/call-flows-hours/ArrowLeft.svg" alt="" />
              </Link>
            </span>
          </div>
          <div className="d-block d-md-none">
            <span>
              <Link to="/comm-voice-admin/call-flows">
                <img src="/assets/call-flows-hours/header-back.svg" alt="" />
              </Link>
            </span>
          </div>
          <div className="d-flex align-items-center gap-4 gap-sm-2 gap-md-3">
            <div className="d-flex align-items-center gap-3 gap-sm-2 gap-md-3 flow-renamed-text">
              <span className="flow-stream-btn">
                <img src="/assets/call-flows-hours/flow-stream-svgrepo-com.svg" alt="" />
              </span>
              <div className="d-flex flex-column flex-sm-row">
                <h5 className="fs-15px text-primary fs-14px m-0 fw-500">{name}</h5>
                <span className="subHeadCode">({id})</span>
              </div>
            </div>
            <div
              className={`d-flex align-items-center gap-4 flow-rename flex-md-nowrap flex-wrap ${
                formik.values.isEditing === true ? '' : 'd-none'
              }`}
            >
              <input
                type="text "
                className="px-2 form-control bg-white"
                value={formik.values.callFlowName}
                onChange={formik.handleChange}
                style={isFormFieldValid(formik, 'callFlowName') ? { border: '1px solid red' } : {}}
              />
              {getFormErrorMessage(formik, 'callFlowName')}
              <button
                type="button"
                className="btn bg-black d-flex align-items-center justify-content-center fw-medium fs-14px text-white px-3 py-12px subHeadSave save"
                onClick={formik.handleSubmit}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                className="custom-backdrop-close d-flex align-items-center justify-content-center btn  btn-outline-dark border fw-medium border-gray-blue px-4 py-12px cancel"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </button>
            </div>
            <div className="d-flex align-items-center gap-4 gap-sm-2 gap-md-3">
              <div className="bg-sandal-color rounded text-sandal-dark text-uppercase fs-10px fw-bolder my-0 px-2 py-1 gap-1 d-inline-flex">
                {status.toUpperCase()}
              </div>
              <Tooltip id="tooltip-rename" content="Rename flow" place="top" />
              <span
                className={`flow-rename-edit-btn ${
                  formik.values.isEditing === false ? '' : 'd-none'
                } `}
              >
                <a
                  href="/#"
                  onClick={(e) => {
                    formik.setFieldValue('isEditing', true);
                    e.preventDefault();
                  }}
                  data-tooltip-id="tooltip-rename"
                >
                  <img src="/assets/PencilSimpleLine.svg" alt="" />
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3 subhead-right justify-content-sm-end gap-sm-2 gap-md-3 ms-5 ms-sm-0">
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
              setShow({ isVisible: true, type: 'test-flow', name, id });
            }}
          >
            <span
              role="button"
              data-tooltip-id="tooltip-flow-preview"
              className="action-btn flow-preview-btn  d-flex flex-column align-items-center justify-content-center fs-11px h-6 w-6 rounded fw-semibold bg-white"
            >
              <img src="/assets/play-btn.svg" alt="preview" />
            </span>
            <Tooltip id="tooltip-flow-preview" content="Flow Preview" place="top" />
          </a>

          <button
            type="button"
            id="publishFlowBtn"
            // data-bs-toggle="modal"
            // data-bs-target="#publishFlow"
            className="btn bg-black fw-medium fs-14px text-white px-3 py-12px "
            onClick={() => {
              setShow({ isVisible: true, type: 'publish-call-flow', name });
            }}
            style={isPublished !== 1 ? {} : { display: 'none' }}
          >
            Publish
          </button>
          <button
            type="button"
            id="unPublishFlow"
            data-bs-toggle="modal"
            data-bs-target="#unPublishFlowModal"
            className="btn bg-black fw-medium fs-14px text-white px-3 py-12px  "
            onClick={() => {
              setShow({ isVisible: true, type: 'unpublish-call-flow', name });
            }}
            style={isPublished === 1 ? {} : { display: 'none' }}
          >
            Unpublish
          </button>
          <a
            href="/#"
            onClick={(e) => {
              e.preventDefault();
            }}
            data-tooltip-id="tooltip-info"
          >
            <img src="/assets/qns-blue.svg" alt="" />
            <Tooltip id="tooltip-info" content="info" place="top" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Subhead;
