import React, { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { Form } from 'antd';
import { Icons } from 'assets';
import { useSelector } from 'react-redux';
import TextField from 'components/textField';
import CustomButton from 'components/button';
import AddIcon from '@mui/icons-material/Add';
import { StyledCoursePayment } from './style';
import CustomCheckbox from 'components/checkbox';
import { FieldErrorMessage } from 'styles/global';
import { primary, secondary } from 'theme/pallete';
import { Formik, Field, ErrorMessage } from 'formik';
import { useLocation, useParams } from 'react-router-dom';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormControlLabel, IconButton, InputAdornment } from '@mui/material';

const CoursePayment = ({ data, setData, setCurrentStep }) => {
  const { id } = useParams();
  const formikRef = useRef(null);
  const installments = [3, 5, 10];
  const location = useLocation().pathname;
  const [activeItems, setActiveItems] = useState([]);
  const [hasAddInstallment, setHasAddInstallment] = useState(false);
  const [selectedInstallments, setSelectedInstallments] = useState([]);
  const { data: detailsData } = useSelector((state) => state.courses.details);
  const path = location.split('/')[2];
  const startDate = dayjs(data?.content?.startDate);
  const endDate = dayjs(data?.content?.endDate);
  const daysDiff = endDate.diff(startDate, 'day');

  const toggleAccordion = (id) => {
    setActiveItems((prevActiveItems) =>
      prevActiveItems.includes(id)
        ? prevActiveItems.filter((item) => item !== id)
        : [...prevActiveItems, id]
    );
  };

  const getOrdinalSuffix = (number) => {
    if (number === 1) {
      return 'st';
    } else if (number === 2) {
      return 'nd';
    } else if (number === 3) {
      return 'rd';
    } else {
      return 'th';
    }
  };

  const getDueDateOfSingleInstallment = (installmentNumber, installment) => {
    const daysBetweenInstallments = Math.floor(daysDiff / installment);
    const dueDate = startDate.add(
      installmentNumber * daysBetweenInstallments,
      'day'
    );
    return dueDate;
  };

  const getEachInstallmentData = (fee, installment) => {
    const singleInstallment = fee / installment;
    return Array.from({ length: installment }, (_, index) => {
      const installmentNumber = index + 1;
      const suffix = getOrdinalSuffix(installmentNumber);
      return (
        <p key={installmentNumber}>
          {installmentNumber}
          {suffix} Installment: ${singleInstallment.toFixed(2)}{' '}
          <span>
            Due Date:{' '}
            {getDueDateOfSingleInstallment(index, installment).format('DD MMM')}
          </span>
        </p>
      );
    });
  };

  const handleInstallmentChange = (e, installment) => {
    const updatedSelections = e.target.checked
      ? [...selectedInstallments, installment]
      : selectedInstallments.filter((sel) => sel !== installment);

    setSelectedInstallments(updatedSelections);
  };

  const handleSubmit = (data) => {
    const { fee } = data;
    const selectedInstallmentsArray = selectedInstallments.map(
      (installment) => {
        const installmentDetails = Array.from(
          { length: installment },
          (_, index) => {
            const installmentNo = index + 1;
            const dueDate = getDueDateOfSingleInstallment(
              index,
              installment
            ).format('YYYY-MM-DD');
            const amount = parseFloat((fee / installment).toFixed(2));
            return { installmentNo, dueDate, amount };
          }
        );

        return { name: `${installment} Installments`, installmentDetails };
      }
    );

    const payload = {
      ...data,
      installments:
        path === 'editCourse'
          ? detailsData?.course?.installments
          : selectedInstallmentsArray,
      feeType:
        path === 'editCourse'
          ? detailsData?.course?.feeType
          : selectedInstallments.length >= 1
            ? 'INSTALLMENTS'
            : 'ONE-TIME'
    };
    // dispatch(setCoursePayment(payload));
    setData(prev => ({ ...prev, payment: payload }))
    setCurrentStep((prev) => prev + 1);
  };

  const updateCourseFee = useCallback(() => {
    if (data?.payment) {
      const { payment } = data;
      formikRef.current.setValues({
        fee: payment.fee
      });
      return;
    }

    if (id) {
      formikRef.current.setValues({
        fee: detailsData?.course.fee
      });
      return;
    }
  }, []);

  useEffect(() => {
    updateCourseFee();
  }, [updateCourseFee]);

  return (
    <StyledCoursePayment>
      <Formik
        innerRef={formikRef}
        onSubmit={handleSubmit}
        initialValues={{ fee: '' }}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form
              noValidate
              name="basic"
              autoComplete="off"
              onFinish={formik.handleSubmit}
            >
              <div className="payment_gateways">
                <h3>
                  Job Guru can accept this course payment by these payment
                  gateways
                </h3>
                <div className="payment_gateways_cards">
                  <div className="payment_gateways_cards_card">
                    <img src={Icons.paypal} alt="paypal" />
                  </div>
                  <div className="payment_gateways_cards_card">
                    <img src={Icons.masterCard} alt="mastercard" />
                  </div>
                  <div className="payment_gateways_cards_card">
                    <img src={Icons.visa} alt="visa" />
                  </div>
                </div>
              </div>

              <div className="field-control">
                <Field name="fee">
                  {({ field }) => (
                    <React.Fragment>
                      <TextField
                        type="number"
                        label="Course Fees"
                        field={{ ...field }}
                        value={formik.values.fee}
                        placeholder="Enter course fees"
                        InputProps={{
                          startAdornment: formik.values.fee && (
                            <InputAdornment
                              position="start"
                              className="dollar-sign"
                            >
                              $
                            </InputAdornment>
                          )
                        }}
                        disabled={id && path === 'editCourse'}
                        error={formik.errors.fee && formik.touched.fee}
                      />
                      <ErrorMessage
                        name={field.name}
                        component={FieldErrorMessage}
                      />
                    </React.Fragment>
                  )}
                </Field>
              </div>

              <div className="installment">
                <CustomButton
                  startIcon={<AddIcon />}
                  text="Add Installment Plan"
                  clicked={() => setHasAddInstallment(true)}
                  disabled={!formik.values.fee || path === 'editCourse'}
                  sxProps={{
                    height: '48px',
                    fontWeight: 600,
                    fontSize: '16px',
                    bg: primary.main
                  }}
                />

                {hasAddInstallment && (
                  <React.Fragment>
                    <p>
                      How many installments you want to take fees of this
                      course?
                    </p>
                    <div className="installment_plans">
                      {installments.map((installment) => (
                        <div
                          key={installment}
                          className={`installment_plans_plan ${activeItems.includes(installment) ? 'active' : ''
                            }`}
                        >
                          <FormControlLabel
                            name="rememberMe"
                            label={`${installment} Installments`}
                            onChange={(e) =>
                              handleInstallmentChange(e, installment)
                            }
                            sx={{
                              margin: '0',
                              color: secondary.main,
                              '.MuiFormControlLabel-label': {
                                fontWeight: 500,
                                fontStyle: 'normal',
                                lineHeight: 'normal',
                                fontFamily: 'Plus Jakarta Sans'
                              }
                            }}
                            control={
                              <CustomCheckbox
                                sx={{ mr: '8px' }}
                                color={secondary.main}
                                checked={selectedInstallments.includes(
                                  installment
                                )}
                              />
                            }
                          />

                          <IconButton
                            size="large"
                            sx={{ padding: 0, float: 'right' }}
                            onClick={() => toggleAccordion(installment)}
                            disabled={
                              !selectedInstallments.includes(installment)
                            }
                          >
                            {activeItems.includes(installment) ? (
                              <ExpandLessIcon
                                sx={{
                                  color:
                                    selectedInstallments.includes(
                                      installment
                                    ) && secondary.main
                                }}
                              />
                            ) : (
                              <ExpandMoreIcon
                                sx={{
                                  color:
                                    selectedInstallments.includes(
                                      installment
                                    ) && secondary.main
                                }}
                              />
                            )}
                          </IconButton>

                          <div className="installment-content">
                            {getEachInstallmentData(
                              formik.values.fee,
                              installment
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </React.Fragment>
                )}
              </div>

              <div className="btn-container">
                <CustomButton
                  text="Previous"
                  variant="outlined"
                  tColor={primary.main}
                  borderColor={primary.main}
                  clicked={() => setCurrentStep((prev) => prev - 1)}
                  sxProps={{
                    height: '48px',
                    fontWeight: 600,
                    fontSize: '16px'
                  }}
                />
                <CustomButton
                  type="submit"
                  text="Save & Next"
                  disabled={!formik.values.fee}
                  sxProps={{
                    height: '48px',
                    fontWeight: 600,
                    fontSize: '16px',
                    bg: primary.main
                  }}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </StyledCoursePayment>
  );
};

export default CoursePayment;

// Validation schema using Yup for form validation
const validationSchema = Yup.object({
  fee: Yup.string().required('Please enter the required field')
});
