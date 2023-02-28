import { useState } from "react";
import { useGetIdentity } from "@pankod/refine-core";
import { FieldValues, useForm } from "@pankod/refine-react-hook-form";

import Form from "components/common/Form";

const CreateProperty = () => {

  const {data :user}=useGetIdentity();
  const [propertyImg , setPropertyImg]=useState({name:'',url:''});
  const {refineCore:{onFinish , formLoading},register,handleSubmit}=useForm();
  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
        new Promise<string>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => resolve(fileReader.result as string);
            fileReader.readAsDataURL(readFile);
        });

    reader(file).then((result: string) =>
        setPropertyImg({ name: file?.name, url: result }),
    );
};
const onFinishHandler=async (data: FieldValues)=>{
  if(!propertyImg.name) return alert('Please Select an Image');
  await onFinish({
    ...data,
    photo : propertyImg.url,
    email:user.email,
  })

};
    return (
    <Form 
        type="Create"
        register={register}
         onFinish={onFinish}
         formLoading={formLoading}
         handleSubmit={handleSubmit}
         handleImageChange={handleImageChange}
         onFinishHandler={onFinishHandler}
         propertyImage={propertyImg}
    />
  )
}

export default CreateProperty
