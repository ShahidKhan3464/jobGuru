import React, { useEffect, useState } from 'react';
import { Icons } from 'assets';
import { StyledStepper } from './style';

/**
 * Stepper component for displaying a step-by-step progress indicator.
 *
 * @param {Object} props - Component properties.
 * @param {number} props.currentStep - The current step index (1-indexed).
 * @param {Array} props.stepsLabel - An array of step labels.
 *
 * @example
 * // Example usage of Stepper component
 * <Stepper
 *   currentStep={currentStepIndex}
 *   stepsLabel={['Step 1', 'Step 2', 'Step 3']}
 * />
 */
const Stepper = ({ currentStep, stepsLabel }) => {
  const [newStep, setNewStep] = useState(null);

  /**
   * Get the icon source based on the step's state (completed, active, or next).
   * @param {Object} item - The step object.
   * @returns {string} - The source of the step's icon.
   */
  const getIconSrc = (item) => {
    let iconSrc;
    if (item.completed) {
      iconSrc = Icons.completedStep;
    } else if (item.active) {
      iconSrc = Icons.activeStep;
    } else {
      iconSrc = Icons.nextStep;
    }
    return iconSrc;
  };

  /**
   * Update the steps' state based on the current step.
   * @param {number} currentStep - The current step index (0-indexed).
   * @param {Array} stepsState - The array of steps' state.
   * @returns {Array} - The updated array of steps' state.
   */
  const updateStep = (currentStep, stepsState) => {
    let count = 0;
    const newSteps = [...stepsState];

    while (count < newSteps.length) {
      // Active step
      if (count === currentStep) {
        newSteps[count] = {
          ...newSteps[count],
          active: true
        };
        count++;
      }
      // Completed step
      else if (count < currentStep) {
        newSteps[count] = {
          ...newSteps[count],
          completed: true
        };
        count++;
      }
      // Pending step
      else {
        newSteps[count] = {
          ...newSteps[count],
          active: false,
          completed: false,
          pending: false
        };
        count++;
      }
    }
    return newSteps;
  };

  useEffect(() => {
    const stepsState = stepsLabel.map((label) => ({
      label,
      active: false,
      completed: false,
      pending: false
    }));
    const current = updateStep(currentStep - 1, stepsState);
    setNewStep(current);
  }, [currentStep]);

  return (
    <StyledStepper step={currentStep}>
      {newStep?.map((item) => (
        <div className="step" key={item.label}>
          <div>
            <img src={getIconSrc(item)} alt="step-icon" />
          </div>
          <span className="step_label">{item.label}</span>
        </div>
      ))}
    </StyledStepper>
  );
};

export default Stepper;
