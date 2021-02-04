import React from 'react'
import {Card,CardContent,Typography} from "@material-ui/core";

function InfoBox(props) {
    const {title,cases,total} = props;
    return (
        <Card>
            <CardContent>
                <Typography className = "infobox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className = "infobox__cases">{cases}</h2>
                <Typography className = "infobox__total">Total:{total}</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
