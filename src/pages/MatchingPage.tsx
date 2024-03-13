import React, { useEffect } from 'react';
import { MatchingStepper } from '../components/MatchingStepper/MatchingStepper';
import {
  LightBulbIcon,
  ArrowUpTrayIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { GettingStarted } from '../components/GettingStarted/GettingStartedMatch';
import { OrdersUploadStep } from '../components/OrdersUploadStep/OrdersUploadStep';
import axios from 'axios';
import { ConciliationResultsStep } from '../components/ConciliationResults/ConciliationResultsStep';
import { useNavigate, useParams } from 'react-router-dom';

const MatchingPage: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [responseData, setResponseData] = React.useState<any>(null);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loadingApiData, setLoadingApiData] = React.useState<
    boolean | undefined
  >(undefined);

  const { step } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Convert the URL param to a number and update the active step
    if (!step) return;
    const match = step.match(/step-(\d+)/);
    const stepNumber = match ? parseInt(match[1], 10) : 0;

    if (stepNumber >= 1 && stepNumber <= 3) {
      setActiveStep(stepNumber - 1);
    }
  }, [step]);

  const handleStart = () => {
    navigate(`/step-2`);
  };

  const manualAwait = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSendDataToMatchApi = async (orders: any) => {
    setLoadingApiData(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_MATCH_API_URL,
        orders
      );
      const { data } = response.data as any;
      console.log(data);
      setResponseData(data); // Save the response data to state
      setErrorMessage(''); // Clear any previous error messages
      navigate(`/step-3`);
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 400
      ) {
        setErrorMessage(
          (error.response.data?.message?.length > 200
            ? error.response.data?.message.substring(0, 200) + '...'
            : error.response.data?.message) ||
            'An error occurred while sending data'
        );
      } else {
        setErrorMessage('An unexpected error occurred');
      }
    } finally {
      await manualAwait(1000);
      setLoadingApiData(false);
    }
  };

  const handleRestartFlow = () => {
    navigate(`/step-1`);
  };

  const steps = [
    {
      id: 'step-1',
      label: 'Step 1',
      description: 'Getting Started',
      icon: <LightBulbIcon className="h-5 w-5" />,
      content: <GettingStarted onProceed={handleStart} />,
    },
    {
      id: 'step-2',
      label: 'Step 2',
      description: 'Upload Your File',
      icon: <ArrowUpTrayIcon className="h-5 w-5" />,
      content: (
        <OrdersUploadStep
          errorMessage={errorMessage}
          onSendData={handleSendDataToMatchApi}
          loadingApiData={loadingApiData}
        />
      ),
    },
    {
      id: 'step-3',
      label: 'Step 3',
      description: 'Check the Conciliation',
      icon: <ClipboardDocumentCheckIcon className="h-5 w-5" />,
      content: (
        <ConciliationResultsStep
          restartFlow={handleRestartFlow}
          matchingData={responseData}
        />
      ),
    },
  ];

  return <MatchingStepper steps={steps} activeStep={activeStep} />;
};

export default MatchingPage;
