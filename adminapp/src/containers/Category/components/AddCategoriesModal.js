import React from "react"
import { Col, Row } from "react-bootstrap"
import Input from "../../../components/UI/Input"
import { NewModal as Modal } from "../../../components/UI/Modal"


const AddCategoryModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage,
        onSubmit
    } = props
    return (
        <Modal
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            onSubmit={onSubmit}
        >
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={'Tên thương hiệu mới'}
                        onChange={(e) => {
                            setCategoryName(e.target.value)
                        }}
                        className="form-control-sm"
                    />
                </Col>
                <Col>
                    <select style={{padding:'11px 18px'}} className='form-control form-control-sm' value={parentCategoryId} onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>Chọn thương hiệu</option>
                        {
                            categoryList.map(option =>
                                <option
                                    key={option.value}
                                    value={option.value}>{option.name}
                                </option>
                            )
                        }
                    </select>
                </Col>
            </Row>
            <ul></ul>         
            <Row>
                <Col>
                    <input type='file' name='categoryImage' onChange={handleCategoryImage}></input>
                </Col>
            </Row>

        </Modal>
    )
}
export default AddCategoryModal
