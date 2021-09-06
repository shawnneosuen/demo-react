import * as React from 'react'
import {
    Button,
    createStyles,
    Toolbar,
    Typography,
    Grid, Input, TextField
} from "@material-ui/core";
import DropDownMenuButton from "components/Button/DropDownMenuButton";
import {ReactNode} from "react";
import DrawPage from './DrawPage'
import {ElementModel} from './model'

const classes = {
    SubHeader: {},
    ButtonGroup: {
        marginLeft: '5%'
    },
    Canvas: {
        marginLeft: '',
        width: window.document.body.clientWidth * 0.7,
        height: window.document.body.clientHeight * 0.7,
        backgroundColor: "grey"
    }
}


class Index extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            elements: []
        }
        this.handleElement = this.handleElement.bind(this)
    }

    Header = () => {
        return <div>
            <Toolbar style={classes.SubHeader}>
                <Typography>绘制库图</Typography>
                <div style={classes.ButtonGroup}>
                    <DropDownMenuButton variant={"outlined"} color={"primary"}/>
                    <Button onClick={() => this.handleElement()}>1234</Button>
                </div>
            </Toolbar>
        </div>
    }

    handleElement = () => {
        // this.setState({
        //     elements: this.state.elements.push()
        // })
    }

    handleElementReferences = (value: ElementModel) => {

    }


    Canvas = ({children}: { children: ReactNode }) => {
        // let classes = useStyle();
        return <div style={classes.Canvas}>
            {children}
        </div>
    }

    SubReference = () => {
        let elementTemp = {
            type: '',
            XPosition: 0,
            YPosition: 0
        }
        return <div>
            <h1>
                参数
            </h1>
            <TextField label={"x"} variant={"outlined"} value={elementTemp.type} onBlur={() => {
                this.setState({element: [{type: 'Button', XPosition: 100, YPosition: 0}]})
            }}></TextField>
            <TextField label={"x"} variant={"outlined"} value={elementTemp.XPosition} onBlur={() => {
                this.setState({element: [{type: 'Button', XPosition: 100, YPosition: 0}]})
            }}></TextField>
            <TextField label={"x"} variant={"outlined"} value={elementTemp.YPosition} onBlur={() => {
                this.setState({element: [{type: 'Button', XPosition: 100, YPosition: 0}]})
            }}></TextField>

            {/*<Button variant={"outlined"} onClick={() => {*/}
            {/*    this.setState({*/}
            {/*        elements:*/}
            {/*    })*/}
            {/*}*/}
            {/*}></Button>*/}
        </div>
    }


    render() {
        return <div key={this.state.elements.length}>
            <this.Header/>
            <Grid style={{display: "flex"}}>
                <Grid item xs={9}>
                    <this.Canvas>
                       <DrawPage elementModels={this.state.elememts}/>
                    </this.Canvas>
                </Grid>
                <Grid item xs={2}>
                    <this.SubReference></this.SubReference>
                </Grid>


            </Grid>
        </div>;
    }
}


export default Index;