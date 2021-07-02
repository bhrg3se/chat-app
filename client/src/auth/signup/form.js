import {
    Button, FormControl, FormHelperText, Grid, TextField,
} from '@material-ui/core';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    textField: {
        width: '50vw',
    },
}));

export const SignupForm = (props) => {
    const classes = useStyles();
    const {handleRegister, formErrorMessage} = props;
    return (
        <form onSubmit={handleRegister}>
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <FormControl fullWidth>
                        <TextField
                            className={classes.textField}
                            aria-label="username"
                            label="Username"
                            name="username"
                            fullWidth
                            type="text"
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth>
                        <TextField
                            className={classes.textField}
                            label="E-mail address"
                            aria-label="e-mail address"
                            type="email"
                            fullWidth
                            name="email"
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl error={!!formErrorMessage.confirmPassword}>
                        <TextField
                            aria-label="password"
                            className={classes.textField}
                            label="Password"
                            type="password"
                            fullWidth
                            inputProps={{minLength: 6}}
                            name="password"
                            required
                        />
                        <FormHelperText>
                            {formErrorMessage.confirmPassword}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl error={!!formErrorMessage.confirmPassword}>
                        <TextField
                            label="Confirm Password"
                            className={classes.textField}
                            aria-label="confirm password"
                            type="password"
                            fullWidth
                            inputProps={{minLength: 6}}
                            name="confirmPassword"
                            required
                        />
                        <FormHelperText>
                            {formErrorMessage.confirmPassword}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item/>
                <Grid item/>
                <Grid item/>
                <Grid item alignItems="center" container direction="row">
                    <Grid item xs={4}/>
                    <Grid item xs={4} alignItems="center">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            color="primary"
                        >
                            Create
                        </Button>
                    </Grid>
                    <Grid item xs={4}/>

                </Grid>

            </Grid>
        </form>
    );
};
