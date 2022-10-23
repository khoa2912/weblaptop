import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getAllCategory, updateCategories, deleteCategories as deleteCategoriesAction } from '../../actions/category'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import { NewModal as Modal } from '../../components/UI/Modal'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowForward, IoIosArrowDown, IoIosAdd, IoIosTrash, IoIosCloudUpload } from 'react-icons/io'
import UpdateCategoriesModal from './components/UpdateCategoriesModal'
import AddCategoryModal from './components/AddCategoriesModal'
import './style.css'
import { generatePublicUrl } from '../../urlConfig'
import { Card, CardActions, CardContent, CardMedia, Icon, Typography } from '@mui/material'
import CardMUI from '../../components/UI/CardMUI'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

/**
* @author
* @function Category
**/

export const Category = (props) => {
    const category = useSelector(state => state.category)
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState([])
    const [expanded, setExpanded] = useState([])
    const [checkedArray, setCheckedArray] = useState([])
    const [expandedArray, setExpandedArray] = useState([])
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false)
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)
    const styles = {
        card: {
          minWidth: 275,
          display: "inline-block"
        }
      };

    useEffect(()=>{
        if(!category.loading){
            setShow(false)
        }
    },[category.loading])
    const handleClose = () => {
        const form = new FormData()

        if (categoryName === "") {
            alert("Name is required")
            setShow(false)
            return
        } 



        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('categoryImage', categoryImage)
        dispatch(addCategory(form))
            .then(result => {
                if (result) {
                    setShow(false)
                    dispatch(getAllCategory())

                }
            })
        setShow(false)
        setCategoryName('');
        setParentCategoryId('');
        dispatch(getAllCategory())



    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    const renderCategories = (categories) => {
        console.log(categories)
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    image:category.image,
                    children: category.children.length > 0 && renderCategories(category.children)
                }

            );
        }
        return myCategories;
    }

    const deleteCategory = () => {
        updateCheckedAndExpandedCategories()
        setDeleteCategoryModal(true)
    }
    const updateCategory = () => {
        updateCheckedAndExpandedCategories()
        setUpdateCategoryModal(true)
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({ _id: item.value }))
        const expandedIdsArray = expandedArray.map((item, index) => ({ _id: item.value }))
        const idsArray = expandedIdsArray.concat(checkedIdsArray)
        if (checkedArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray))
                .then(result => {
                    if (result) {
                        //dispatch(getAllCategory())

                    }
                })
        }
        setDeleteCategoryModal(false)
        dispatch(getAllCategory())
    }

    const updateCheckedAndExpandedCategories = () => {
        const categories = createCategoryList(category.categories)
        const checkedArray = []
        const expandedArray = []
        checked.length > 0 && checked.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value)
            category && checkedArray.push(category)
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {
            const category = categories.find((category, _index) => categoryId === category.value)
            category && expandedArray.push(category)
        })
        setCheckedArray(checkedArray)
        setExpandedArray(expandedArray)
    }

    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const createCategoryList = (categories, options = []) => {

        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category.type
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }

        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }
    const updateCategoriesForm = () => {
        const form = new FormData()


        expandedArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type', item.type)
        })
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value)
            form.append('name', item.name)
            form.append('parentId', item.parentId ? item.parentId : "")
            form.append('type', item.type)
        })

        dispatch(updateCategories(form))
            .then(result => {
                if (result) {
                    dispatch(getAllCategory())

                }
            })
        dispatch(getAllCategory())
        setUpdateCategoryModal(false)

    }


    const renderDeleteCategoryModal = () => {
        return (
            <Modal
                modalTitle="Xóa thương hiệu"
                show={deleteCategoryModal}
                handleClose={() => setDeleteCategoryModal(false)}
                buttons={[
                    {
                        label: 'Trở về',
                        color: 'primary',
                        onClick: () => {
                            setDeleteCategoryModal(false)
                        }
                    },
                    {
                        label: 'Xác nhận',
                        color: 'danger',
                        onClick: deleteCategories
                    }
                ]}
            >
                <h5>Mở rộng</h5>
                {
                    expandedArray.map((item, index) => <span key={index}>{item.name}<br></br></span>)
                }
                <h5>Đã chọn</h5>
                {
                    checkedArray.map((item, index) => <span key={index}>{item.name}<br></br></span>)
                }


            </Modal>
        )
    }
    const categoryList = createCategoryList(category.categories)
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ paddingTop:'30px', display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Các thương hiệu</h3>
                            <div className="actionBtnContainer">
                                <span>Hành động </span>
                                <button onClick={handleShow}><AddIcon/><span>Thêm </span></button>
                                <button onClick={deleteCategory}><DeleteIcon /><span>Xóa</span></button>
                                <button onClick={updateCategory}><EditIcon /> <span>Sửa</span></button>
                            </div>
                        </div>
                    </Col>
                </Row>
                {/* <Row>
                    <Col md={12}>

                        <ul>
                              {renderCategories(category.categories)}  
                        </ul>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />,
                            }}
                        />

                    </Col>
                </Row> */}

            </Container>
            <AddCategoryModal
                show={show}
                handleClose={()=>setShow(false)}
                onSubmit={handleClose}
                modalTitle={'Thêm thương hiệu mới'}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryList={categoryList}
                handleCategoryImage={handleCategoryImage}
            />
            <UpdateCategoriesModal
                show={updateCategoryModal}
                handleClose={()=>{setUpdateCategoryModal(false)}}
                onSubmit={updateCategoriesForm}
                modalTitle={'Chỉnh sửa thương hiệu'}
                size='lg'
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={categoryList}
            />

            {/* {renderDeleteCategoryModal()} */}
            <div style={{ display: "inline-block" }}>
                {category.categories&&renderCategories(category.categories).map(item=>(
                
                <CardMUI item={item}/>
            ))}
            </div>
        </Layout>
    )

}