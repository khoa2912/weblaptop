import React, { useState, useEffect } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { api } from '../../urlConfig';
const convertImagesURL = (images = []) => {
  if(images!=''){
    return images.map(image => {
      return {
        ...image,
        [image.url ? 'url' : 'thumbUrl']: image.url ? `${api}/public/${image.url}` : image.thumbUrl,
        uid: image.uid || image.url
      };
    });
  }

};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function UploadPicture(props) {
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [images, setImages] = useState([]);
  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const upLoadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>{props.title || 'Thêm tài liệu'}</div>
    </div>
  );

  const handleChange = ({ file, fileList }) => {
    const acceptedFileType = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/webp','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/msword','application/pdf','application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    if (acceptedFileType.includes(file.type)) {
      if (!file.preview && file.originFileObj?.name) {
        getBase64(file.originFileObj).then(result => {
          file.preview = result;
        });
        file.response = null;
        file.status = 'done';
      }

      setImages(fileList);

      if (props.onAddImage) {
        return props.onAddImage(fileList);
      }

      props.onChange(fileList);

    }
  };

  const handleRemove = (file) => {
    if (props.onRemove) {
      props.onRemove(file);
    }
    return true;
  };

  const handlePreview = file => {
    setPreviewImage(file.url || file.preview || file.thumbUrl);
    setPreviewVisible(true);
    setPreviewTitle(file.name);
  };

  const customRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  useEffect(() => {

    if (props.isConvertUrl) {
      if(props.images!=''){
        setImages(convertImagesURL(props.images) || []);
      }
      else {
        setImages(props.images || []);
      }
    } else {
      setImages(props.images || []);
    }
  }, [props.isConvertUrl, props.images]);

  return ( 
    <>
      <Upload
        listType="picture-card"
        fileList={images}
        multiple={true}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        customRequest={customRequest}
        disabled={props.disabled}
      >
        {images.length >= 20 ? null : upLoadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        footer={null}
        title={previewTitle}
        onCancel={handleCancel}
      >
        <img alt='preview' style={{ width: '100%', objectFit: 'scale-down' }} src={previewImage} />
        {/* <DocViewer documents={docs} /> */}
      </Modal>
    </>
  );
}

export default UploadPicture;
