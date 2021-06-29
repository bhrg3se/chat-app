import {Button, FormControl, Grid, TextField} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    textField: {
        width: "50vw"
    },
}));


export const LoginForm = (props) => {
    const classes = useStyles();
    const {handleLogin} = props;

    return (
        <form onSubmit={handleLogin}>
            <Grid>
                <Grid>
                    <FormControl margin="normal" required>
                        <TextField
                            className={classes.textField}
                            aria-label="username"
                            label="Username"
                            name="username"
                            type="text"
                        />
                    </FormControl>
                </Grid>
                <FormControl margin="normal" required>
                    <TextField
                        className={classes.textField}
                        label="password"
                        aria-label="password"
                        type="password"
                        name="password"
                    />
                </FormControl>
                <Grid item alignItems={"center"} container direction={"row"}>
                    <Grid item xs={4}/>
                    <Grid item xs={4} alignItems={"center"}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            color={"primary"}
                        >
                            Login
                        </Button>
                    </Grid>
                    <Grid item xs={4}/>
                </Grid>
            </Grid>
        </form>

    )
}
