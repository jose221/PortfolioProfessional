import RComponent from "../RComponent";
import store from "../../redux/store/store";
import addTodo from "../../redux/actions/add-todo";
import {Provider} from "react-redux";
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
let primary_url = window.url_api+"/admin/my-contacts";
class ListContactsComponent extends RComponent {
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
        let res = await this.getItems(`${primary_url}`)
        this.state.data = res;
        this.dispatchStore(this.state)
        //let data = new User(res);
    }
    onRowSelectionModelChange = (params)=>{
        this.state.ids = params;
        this.dispatchStore(this.state)
        //this.setState({openModal : true});
    }
    processRowUpdate = (newRow, oldRow)=>{
        const editableFields = ['name_en', 'name_es', 'url_path', 'icon_path'];
        const changedField = Object.keys(newRow).find(field =>
            newRow[field] !== oldRow[field] &&
            editableFields.includes(field)
        );

        if(changedField && newRow[changedField] !== '') {
            this.handleEdit(`${primary_url}/${newRow.id}`, {
                id: newRow.id,
                value: newRow[changedField],
                field: changedField
            });
        }
        return newRow;
    }
    handleDelete = async()=>{
        await this.onDelete(`${primary_url}/delete`, this.state.ids)
        await this.onInit();
    }

    render() {
        /**
         * {field: 'image_upload', headerName: 'image_upload', width: 100,
                type: 'file', description: 'icono del contacto de awesome fonts',
                renderCell: (params) => {
                const ELEMENT = <div>
                    <img data-open="icon_path" id="image-icon_path" src="https://play-lh.googleusercontent.com/ZvMvaLTdYMrD6U1B3wPKL6siMYG8nSTEnzhLiMsH7QHwQXs3ZzSZuYh3_PTxoU5nKqU" />
                    <input onChange={this.handleChangeInputGrid} hidden accept="image/*" multiple type="file"
                           id="icon_path" name="icon_path" />
                </div>;
                    return ELEMENT;
            },sortable: true
            },
         * **/
        let columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            {field: 'name_en', headerName: 'Nombre en ingles', width: 200, type: 'string', description: 'Nombre que se verá inglés', sortable: true, editable: true},
            {field: 'name_es', headerName: 'Nombre en español', width: 200, type: 'string', description: 'Nombre que se verá en español', sortable: true, editable: true},
            {field: 'url_path', headerName: 'Url', width: 400,
                type: 'string', description: 'Url del contacto',editable: true,
                renderCell: (params) => <a href={params.row.url_path || ''}>{params.row.url_path || ''}</a>,  sortable: true, },
            {field: 'icon_path', headerName: 'Icono', width: 100,
                type: 'string', description: 'icono del contacto de awesome fonts',
                renderCell: (params) => <i className={ params.row.icon_path+' fa-2x text-center'}></i>,  sortable: true, editable: true},

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
                <Card className="container">
                    <CardContent>
                        <div className="d-flex justify-content-between">
                            <h5 className="subtitle-text pb-3 ico-r"> <PersonIcon /> Información de contacto </h5>
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
                                initialState={{
                                    pagination: {
                                        paginationModel: { pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                                processRowUpdate={this.processRowUpdate}
                                onRowSelectionModelChange={this.onRowSelectionModelChange}
                                onCellClick={(params, e)=> this.onCellClick(params,e)}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}
export default ListContactsComponent;
let name_component = document.querySelector("list-contacts-component");
if (name_component) {
    const propsContainer = name_component;
    const props = Object.assign({}, propsContainer.dataset);
    renderComponent(ListContactsComponent, name_component, props);
}
