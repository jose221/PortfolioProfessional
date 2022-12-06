import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import RComponent from "../RComponent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import PersonIcon from "@mui/icons-material/Person";

class ListProfessionalExperiencesComponent extends RComponent{
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        this.subscribeStore();
        //await this.onInit();
    }
    onInit = async ()=>{
        let res = await this.getItems(`/api/admin/knowledges/${this.props.id}`)
        this.state.data = res;
        this.dispatchStore(this.state)
    }

    render() {
        const selectAccordion = (panel) => (event, isExpanded) => {
            console.log(panel);
            this.state.expandedAccordion = (isExpanded) ? panel : "";
            this.dispatchStore(this.state)
        };
        return (
           <div>
               <Backdrop
                   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                   open={this.state.isLoading}
               >
                   <CircularProgress color="inherit" />
               </Backdrop>
               <Snackbar open={this.state.isSuccess} autoHideDuration={6000}  onClose={this.successHandleClose}>
                   <Alert onClose={this.successHandleClose} severity="success" sx={{ width: '100%' }}>
                       {this.state.isSuccessMessage}
                   </Alert>
               </Snackbar>
               <Card className="container">
                   <CardContent>
                       <div className="d-flex justify-content-between">
                           <h5 className="subtitle-text pb-3 ico-r"> <PersonIcon /> Información de conocimientos </h5>
                       </div>
                       <div>
                           <Accordion expanded={this.state.expandedAccordion === 'panel1'} onChange={selectAccordion('panel1')}>
                               <AccordionSummary
                                   expandIcon={<ExpandMoreIcon />}
                                   aria-controls="panel1bh-content"
                                   id="panel1bh-header"
                               >
                               </AccordionSummary>
                               <AccordionDetails>
                                   <Typography>
                                       Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                                       Aliquam eget maximus est, id dignissim quam.
                                   </Typography>
                               </AccordionDetails>
                           </Accordion>
                       </div>
                   </CardContent>
               </Card>
           </div>
        )
    }

}

export default ListProfessionalExperiencesComponent;
let name_component = document.querySelector("list-professional-experiences-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    ReactDOM.render(<ListProfessionalExperiencesComponent {...props} />, name_component);
}
