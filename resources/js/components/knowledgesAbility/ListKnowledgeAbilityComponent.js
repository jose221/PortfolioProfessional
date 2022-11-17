import RComponent from "../RComponent";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {DataGrid} from "@mui/x-data-grid";
import ReactDOM from "react-dom";
import React from "react";
import KnowLedgeAbility from "../../models/KnowLedgeAbility";
import EditIcon from "@mui/icons-material/Edit";
import Collapse from "@mui/material/Collapse";

class ListKnowledgeAbilityComponent extends RComponent {
    constructor(props) {
        super(props);
        //this.state.data = [];
        //this.getItem(`/api/admin/user/${this.props.id}`);
        //store.dispatch(addTodo(this.state));
    }

    async componentDidMount() {
        this.subscribeStore();
        await this.onInit();
    }
    onInit = async ()=>{
        let res = await this.getItems(`/api/admin/knowledges/abilities/${this.props.id}`)
        this.state.data = res;
        this.dispatchStore(this.state)
        //let data = new User(res);
    }
    onSelectionModelChange = (params)=>{
        this.state.ids = params;
        this.dispatchStore(this.state)
        //this.setState({openModal : true});
    }
    onCellEditCommit = (params)=>{
        if(params.value != "") this.handleEdit(`/api/admin/knowledges/abilities/edit/${params.id}`, params);
    }
    handleDelete = async()=>{
        await this.onDelete("/api/admin/knowledges/abilities/delete", this.state.ids)
        await this.onInit();
    }
    openEdit = async(params)=>{
        this.state.form = new KnowLedgeAbility(params.row);

        this.state.openModal = true;
        this.dispatchStore(this.state)
    }

    render() {
        let columns = [
            {
                field: 'Editar',
                type: 'edit',
                width: 60,
                sortable: false, editable: false,
                renderCell: (params) =><IconButton onClick={()=>this.openEdit(params)} aria-label="edit" color="secondary">
                    <EditIcon />
                </IconButton>,
            },
            { field: 'id', headerName: 'ID', width: 70 },
            {field: 'title_en', headerName: 'Titulo en inglés', width: 200, type: 'string', description: 'Titulo que se verá inglés', sortable: true, editable: true},
            {field: 'title_es', headerName: 'Titulo en español', width: 200, type: 'string', description: 'Titulo que se verá en español', sortable: true, editable: true},
            {field: 'description_es', headerName: 'Descripción en español', width: 200, type: 'string', description: 'Descripción que se verá en español', sortable: true, editable: true},
            {field: 'description_en', headerName: 'Descripción en inglés', width: 200, type: 'string', description: 'Descripción que se verá en inglés', sortable: true, editable: true},

        ];
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
                <div className="row">
                    <div className="col-md-4">
                        <info-knowledge-component data-id={this.props.id} />
                    </div>
                    <div className="col-md-8">
                        <Card className="container">
                            <CardContent>
                                <div className="d-flex justify-content-between">
                                    <h5 className="subtitle-text pb-3 ico-r"> <PersonIcon /> Información de las habilidades </h5>
                                    <div>
                                        <IconButton disabled={this.state.ids.length <=0} aria-label="delete" onClick={this.handleDelete} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </div>
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={this.state.data}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[4]}
                                        checkboxSelection
                                        onCellEditCommit={(params)=>this.onCellEditCommit(params)}
                                        onSelectionModelChange={(params)=> this.onSelectionModelChange(params)}
                                        onCellClick={(params, e)=> this.onCellClick(params,e)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
export default ListKnowledgeAbilityComponent;
let name_component = document.querySelector("list-knowledge-ability-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    ReactDOM.render(<ListKnowledgeAbilityComponent {...props} />, name_component);
}
