import React, { useEffect, useState } from 'react';
import { Container, Box, Stepper, Step, StepLabel, Typography, RadioGroup, FormControlLabel, Radio, TextField, MenuItem, Select, InputLabel } from '@mui/material';
import QRCode from 'qrcode.react';
import { useSpring, animated } from 'react-spring';
import { Button } from '@mui/material';
import { withStyles } from '@mui/styles';
import StepIcon from '@mui/material/StepIcon';
import { makeStyles } from '@mui/styles';


const carWashImage = "https://cdn.shopify.com/s/files/1/0304/3386/9883/articles/shutterstock_1612514797_ffeb80cf-73d8-4bf3-be32-cda8f525f041_1200x.jpg?v=1660768210";
const foamWashImage = `${process.env.PUBLIC_URL}/assets/2.jpg`;
const airBlowImage = 'https://cdn.motor1.com/images/mgl/kjJ0B/s1/blow-drying-a-car.jpg';

interface StepContentProps {
  activeStep: number;
  paymentMethod: string;
  paymentDetails: string;
  selectedOption: string;
  selectedScoreOption: string;
  setPaymentMethod: (value: string) => void;
  setPaymentDetails: (value: string) => void;
  setSelectedOption: (value: string) => void;
  setSelectedScore: (value: string) => void;
}

const CustomStepIcon = withStyles({
  root: {
    width: '36px',
    height: '36px',
    fontSize: '2px',
    '&$completed': {
      color: 'rgb(37, 150, 83)',
    },
    '&$active': {
      color: 'rgb(33, 150, 243)',
    },
  },
  active: {},
  completed: {},
})(StepIcon);


const StepContent: React.FC<StepContentProps> = ({ activeStep, paymentMethod, paymentDetails, selectedOption, selectedScoreOption, setPaymentMethod, setPaymentDetails, setSelectedOption, setSelectedScore }) => {
  const handlePaymentMethodChange = (event: any) => {
    const value = event.target.value;
    setPaymentMethod(value);
    if (value === 'QR') {
      setPaymentDetails('');
    }
  };

  const handlePaymentDetailsChange = (event: any) => {
    setPaymentDetails(event.target.value);
  };

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value as string);
  };

  const handleSelectScoreChange = (event: any) => {
    setSelectedScore(event.target.value as string);
  };

  const isPaymentMethodQR = paymentMethod === 'QR';

  return (
    <>
      {activeStep === 0 && (
        <>
          <Typography>Step 1: ชำระเงิน</Typography>
          <Box mt={2}>
            <Typography variant="h6">กรุณาเลือกวิธีการชำระเงิน:</Typography>
            <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
              <FormControlLabel value="QR" control={<Radio />} label="QR Code" />
              <FormControlLabel value="Cash" control={<Radio />} label="เงินสด" />
            </RadioGroup>
            {isPaymentMethodQR && (
              <>
                <Box mt={2}>
                  <Typography>QR Code</Typography>
                  <QRCode value={'100'} />
                </Box>
              </>
            )}
            {!isPaymentMethodQR && (
              <Box mt={1}>
                <TextField label="ระบุยอดเงิน" value={paymentDetails} onChange={handlePaymentDetailsChange} fullWidth />
              </Box>
            )}
          </Box>
        </>
      )}
      {activeStep === 1 && (
        <>
          <Typography>Step
            2: เลือกรายการ</Typography>
          <Box mt={2}>
            <InputLabel id="select-label">เลือกบริการ:</InputLabel>
            <Select labelId="select-label" value={selectedOption} onChange={handleSelectChange} fullWidth>
              <MenuItem value="ฉีดน้ำ">
                <Box display="flex" alignItems="center">
                  <img src={carWashImage} alt="Car wash" style={{ marginRight: '10px', height: '30px' }} />
                  ฉีดน้ำ
                </Box>
              </MenuItem>
              <MenuItem value="ฉีดโฟม">
                <Box display="flex" alignItems="center">
                  <img src={foamWashImage} alt="Foam wash" style={{ marginRight: '10px', height: '30px' }} />
                  ฉีดโฟม
                </Box>
              </MenuItem>
              <MenuItem value="เป่าแห้ง">
                <Box display="flex" alignItems="center">
                  <img src={airBlowImage} alt="Air blow" style={{ marginRight: '10px', height: '30px' }} />
                  เป่าแห้ง
                </Box>
              </MenuItem>
              <MenuItem value="เติมลม">เติมลม</MenuItem>
              <MenuItem value="ดูดฝุ่น">ดูดฝุ่น</MenuItem>
            </Select>
            <Box mt={2}>
              <Typography>บริการที่เลือก: {selectedOption}</Typography>
            </Box>
          </Box>
        </>
      )}
      {activeStep === 2 && (
        <>
          <Typography>Step 3: ระดับความแรง</Typography>
          <Box mt={2}>
            <InputLabel id="select-label">กรุณาเลือกระดับความแรง:</InputLabel>
            <Select labelId="select-label" value={selectedScoreOption} onChange={handleSelectScoreChange} fullWidth>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
            <Box mt={2}>
              <Typography>ระดับความแรง: {selectedScoreOption}</Typography>
            </Box>
          </Box>
        </>
      )}
      {activeStep === 3 && (
        <>
          <Typography variant="h6">สรุป</Typography>
          <Box mt={2}>
            <Typography>ประเภทชำระเงิน: {paymentMethod}</Typography>
            {isPaymentMethodQR ? (
              <Typography>QR Code: 100</Typography>
            ) : (
              <Typography>ระบุยอดเงิน: {paymentDetails}</Typography>
            )}
            <Typography>บริการที่เลือก: {selectedOption}</Typography>
            <Typography>ระดับความแรง: {selectedScoreOption}</Typography>
            <Box mt={2}>
              {selectedOption === 'ฉีดโฟม' && (
                <img src={foamWashImage} alt="Foam wash" style={{ height: '150px' }} />
              )}
              {selectedOption === 'ฉีดน้ำ' && (
                <img src={carWashImage} alt="Car wash" style={{ height: '150px' }} />
              )}
              {selectedOption === 'เป่าแห้ง' && (
                <img src={airBlowImage} alt="Air blow" style={{ height: '150px' }} />
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

const Checkout: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedScoreOption, setSelectedScoreOption] = useState('');
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const nextButtonSpring = useSpring({ transform: 'scale(1)', from: { transform: 'scale(0)' }, config: { tension: 180, friction: 12 } });

  const steps = ['ชำระเงิน', 'เลือกรายการ', 'ระดับความแรง', 'สรุป'];

  const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    if (activeStep === 0) {
      setIsNextDisabled(!paymentMethod || (paymentMethod === 'Cash' && !paymentDetails));
    } else if (activeStep === 1) {
      setIsNextDisabled(!selectedOption);
    } else if (activeStep === 2) {
      setIsNextDisabled(!selectedScoreOption);
    }
  }, [activeStep, paymentMethod, paymentDetails, selectedOption, selectedScoreOption]);

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            marginBottom: 2,
            color: '#4a4a4a',
            fontWeight: 700,
            letterSpacing: '0.05em',
            borderBottom: '2px solid #4a4a4a',
            paddingBottom: (theme) => theme.spacing(1),
            textTransform: 'uppercase',
          }}
        >
          Capybara car care
        </Typography>
        <Box display="flex" justifyContent="center">
          <img src={`${process.env.PUBLIC_URL}/assets/1.jpg`} alt="Capybara" style={{ height: '150px' }} />
        </Box>
      </Box>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box mt={4} mb={4}>
        <StepContent
          activeStep={activeStep}
          paymentMethod={paymentMethod}
          paymentDetails={paymentDetails}
          selectedOption={selectedOption}
          selectedScoreOption={selectedScoreOption}
          setSelectedScore={setSelectedScoreOption}
          setPaymentMethod={setPaymentMethod}
          setPaymentDetails={setPaymentDetails}
          setSelectedOption={setSelectedOption}
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
          Back
        </Button>
        <animated.div style={nextButtonSpring}>
          <Button disabled={activeStep === steps.length - 1 || isNextDisabled}
            onClick={handleNext}
            variant="contained"
            color="primary"
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </animated.div>
      </Box>
    </Container>
  );
};

export default Checkout;