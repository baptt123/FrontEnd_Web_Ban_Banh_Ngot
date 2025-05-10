import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import axios from 'axios';

const ReviewForm = () => {
    const [value, setValue] = useState({
        message: ''
    });

    const changeHandler = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
        validator.showMessages();
    };

    const [validator] = React.useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));

    const submitForm = async (e) => {
        e.preventDefault();
        if (validator.allValid()) {
            try {
                // Gửi message qua API
                const response = await axios.post('http://localhost:8080/api/messages', {
                    message: value.message
                });

                if (response.status === 200) {
                    setValue({ message: '' });
                    validator.hideMessages();
                    toast.success('Message sent successfully!');
                } else {
                    toast.error('Failed to send message');
                }
            } catch (error) {
                toast.error('Error occurred while sending message');
            }
        } else {
            validator.showMessages();
            toast.error('Empty field is not allowed!');
        }
    };

    return (
        <Grid className="reviewForm">
            <form onSubmit={(e) => submitForm(e)}>
                <Grid item xs={12}>
                    <TextField
                        className="formDefault"
                        fullWidth
                        value={value.message}
                        variant="outlined"
                        name="message"
                        label="Message"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onBlur={(e) => changeHandler(e)}
                        onChange={(e) => changeHandler(e)}
                    />
                    {validator.message('message', value.message, 'required')}
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" className="theme-btn">Submit</Button>
                </Grid>
            </form>
        </Grid>
    );
};

export default ReviewForm;
