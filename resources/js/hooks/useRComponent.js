import { useState, useEffect } from 'react';
import { DefaultService } from "../services/DefaultService";
import store from "../redux/store/store";
import addTodo from "../redux/actions/add-todo";

export const useRComponent = (initialState = {}) => {
  const [state, setState] = useState({
    ids: [],
    data: {},
    isLoading: false,
    isSuccess: false,
    openEdit: false,
    isSuccessMessage: "Exitoso!",
    openModal: false,
    form: {},
    information: {},
    expandedAccordion: "",
    dataAutocomplete: {},
    ...initialState
  });

  useEffect(() => {
    window.url_api = window.url_api || "http://localhost:8080/api";
    window.url_image = window.url_image || "http://localhost:8080";
  }, []);

  const handleChangeInputGrid = (event) => {
    const key = event.target.getAttribute('name');
    if (event.target.files.length) {
      setState(prevState => ({
        ...prevState,
        form: {
          ...prevState.form,
          [key]: event.target.files[0]
        }
      }));
    }
  };

  const onCellClick = (params, e) => {
    // Implementation as needed
  };

  const handleEdit = async (url, item) => {
    let param = {};
    param[item.field] = item.value;
    let response = await DefaultService.edit(url, param);
    setState(prevState => ({
      ...prevState,
      isSuccess: true,
      isSuccessMessage: response.message
    }));
    dispatchStore(state);
  };

  const handleChange = (event) => {
    const key = event.target.getAttribute('name');
    let value;

    switch (event.target.getAttribute('type')) {
      case 'file':
        if (event.target.files.length) {
          value = event.target.files[0];
        }
        break;
      case 'array':
        // Handle array type
        break;
      default:
        value = event.target.value;
        break;
    }

    setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [key]: value
      }
    }));
    dispatchStore(state);
  };

  const handleChangeAutocomplete = (event, newValue, key, type) => {
    setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [key]: newValue
      }
    }));
    dispatchStore(state);
  };

  const handleChangeForm = (event) => {
    if (event.target) {
      const key = event.target.name;
      let value;

      switch (event.target.type) {
        case 'file':
          if (event.target.files.length) {
            value = event.target.files[0];
          }
          break;
        default:
          value = event.target.value;
          break;
      }

      setState(prevState => ({
        ...prevState,
        form: {
          ...prevState.form,
          [key]: value
        }
      }));
    }
    dispatchStore(state);
  };

  const loadImage = (image, id) => {
    let url = window.url_image || "http://localhost:8080";
    if (typeof image == 'object') {
      try {
        var reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = function() {
          image = reader.result;
          document.querySelector(id).src = image;
        };
      } catch (e) {
        image = "";
      }
    } else {
      return url + image || "https://amazonia.mapbiomas.org/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";
    }
  };

  const successHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState(prevState => ({
      ...prevState,
      isSuccess: false
    }));
    dispatchStore(state);
  };

  const formatDateString = (item) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(item).toLocaleDateString('es-mx', options);
  };

  const getItem = async (url, params = {}) => {
    setState(prevState => ({ ...prevState, isLoading: true }));
    let data = await DefaultService.find(url, params);
    data.updated_at = formatDateString(data.updated_at);
    setState(prevState => ({ ...prevState, isLoading: false }));
    dispatchStore(state);
    return data;
  };

  const getItems = async (url, params = {}, showLoading = true) => {
    if (showLoading) setState(prevState => ({ ...prevState, isLoading: true }));
    let data = await DefaultService.all(url, params);
    if (data.updated_at) {
      data.updated_at = formatDateString(data.updated_at);
    }
    if (showLoading) {
      setState(prevState => ({ ...prevState, isLoading: false }));
      dispatchStore(state);
    }
    return data;
  };

  const onUpdate = async (url, params) => {
    setState(prevState => ({ ...prevState, isLoading: true }));
    let response = await DefaultService.update(url, params);
    setState(prevState => ({
      ...prevState,
      isLoading: false,
      isSuccess: true,
      isSuccessMessage: response.message
    }));
    dispatchStore(state);
    return response;
  };

  const onCreate = async (url, params) => {
    setState(prevState => ({ ...prevState, isLoading: true }));
    let response = await DefaultService.create(url, params);
    setState(prevState => ({
      ...prevState,
      isLoading: false,
      isSuccess: true,
      isSuccessMessage: response.message
    }));
    dispatchStore(state);
    return response;
  };

  const onDelete = async (url, params, showMessage = true) => {
    let response = await DefaultService.delete(url, {
      ids: params
    });
    if (showMessage) {
      setState(prevState => ({
        ...prevState,
        isSuccess: true,
        isSuccessMessage: response.message
      }));
      dispatchStore(state);
    }
    return response;
  };

  const isValid = (data, required = true) => {
    let isInvalid = false;
    if (data != undefined) {
      data = data.toString();
      if (required && (!data || data.trim() == "" || data == null || data == '<p><br></p>')) isInvalid = true;
    } else {
      isInvalid = true;
    }
    return isInvalid;
  };

  const dispatchStore = (state) => {
    store.dispatch(addTodo(state));
  };

  const subscribeStore = (callback = function(res) {}, noState = false) => {
    const unsubscribe = store.subscribe(() => {
      let res = store.getState();
      if (!noState) {
        setState(prevState => ({ ...prevState, ...res.data }));
      }
      callback(res.data);
    });

    return unsubscribe;
  };

  const goToHref = async (url) => {
    window.location.href = url;
  };

  return {
    state,
    setState,
    handleChangeInputGrid,
    onCellClick,
    handleEdit,
    handleChange,
    handleChangeAutocomplete,
    handleChangeForm,
    loadImage,
    successHandleClose,
    formatDateString,
    getItem,
    getItems,
    onUpdate,
    onCreate,
    onDelete,
    isValid,
    dispatchStore,
    subscribeStore,
    goToHref
  };
};
