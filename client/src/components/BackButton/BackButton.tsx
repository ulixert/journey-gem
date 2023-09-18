import { useNavigate } from 'react-router-dom';

import { Button } from '../Button/Button.tsx';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)} variant="back" preventFormSubmission>
      &larr; Back
    </Button>
  );
}
