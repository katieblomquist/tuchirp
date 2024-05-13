import React, { useState } from 'react';
import { Button, Card, TextField } from '@mui/material';
import '/src/index.css';  

interface NewPostProps {
  onPostCreate: (text: string) => void;  
}

const NewPost: React.FC<NewPostProps> = ({ onPostCreate }) => {
  const [text, setText] = useState<string>('');

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    onPostCreate(text);
    setText(''); 
  };

  return (
    <Card variant="outlined" className="cardStyle">
      <TextField
        fullWidth
        variant="outlined"
        label="How's the college life?"
        multiline
        rows={4}
        value={text}
        onChange={handleTextChange}
        className="textFieldStyle"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className="submitButton"
        style={{ margin: '20px' }}  
      >
        Post
      </Button>
    </Card>
  );
}

export default NewPost;
