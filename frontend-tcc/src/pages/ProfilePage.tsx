import React, { useEffect } from 'react';
import ProfileIcon from '../components/icons/source/ProfileIcon';
import { Add, Edit, Save } from '@mui/icons-material';
import Button from '../components/inputs/Button'
import PlatformPage from './PlatformPage';
import { Link } from 'react-router-dom';
import InformativeTextBox from '../components/inputs/InformativeTextBox';
import Input from '../components/inputs/Input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/src/yup.js';
import { AnyObject, ObjectSchema } from 'yup';
import schema from "../validator/auth/register"
type ProfileEdit = {
  name: string,
  description: string
}
export default function ProfilePage() {
  const user = {
    Name: "Vinnicius Oliveira Rodrigues",
    City: "Cubatão",
    TipoUsuario: 1
  }; // Substitua pelo nome de usuário real
  const [name, setName] = useState("Vinnicius Oliveira Rodrigues");
  const [description, setDescription] = useState(`Texto informativo blablabla quasquasquas quask quias mqiwniems uwqhqusha smdqwi misadnhtqwn<br />
    sadqwenhuwh auadwqwem dosaoow qwuaquqauqas quas misdamsidmqw<br />
    Texto informativo blablabla
    quasquasquas quask quias mqiwniems uwqhqusha smdqwi misadnhtqwn<br />
    sadqwenhuwh auadwqwem dosaoow qwuaquqauqas quas misdamsidmqw`);
  const [isEditing, setIsEditing] = useState(false);
  const [usuarioDoador, setUsuarioDoador] = useState(false);

  useEffect(() => {
    if (user.TipoUsuario == 1)
      setUsuarioDoador(true);
  }, [])

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProfileEdit>({
    resolver: yupResolver<ProfileEdit>(schema as unknown as ObjectSchema<ProfileEdit, AnyObject, "">),
  })

  const handleSave = () => {
    //Função para salvar as alterações como a chamada de uma API. 
    setIsEditing(false);
  }

  return (
    <div className="pt-20 md:pt-60 flex flex-col justify-items-center p-36 mx-auto items-center">
      <div className="w-full flex flex-col text-primary font-bold md:text-4xl text-2xl text-primary items-start">
        <p className="mt-12 mb-8 md:mb-16 mb:mt-0">EDITAR PERFIL:</p>
        <div className="flex flex-col md:flex-row justify-center items-center md:text-3xl text-2xl mb-4 md:mb-8">
          <div className='flex flex-col items-center md:grid md:justify-items-end'>
            <ProfileIcon
              src="https://media.licdn.com/dms/image/v2/D4D03AQGtIXOV_MHwBA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1689786538361?e=1730937600&v=beta&t=ocBLwVq04PBejzJsPywktukJx7UUazFARIU_AOks9ZY"
              size={150}
              className="border-2 border-gray-300"
              alt="Imagem do Perfil do Usuário"
            />
            <Add className='mt-2 md:mt-0' />
          </div>
          {isEditing ? (
            <div className='mx-4 md:mx-12'>
              <div className='mb-4 md:mb-6'>
                <Input
                  name='name'
                  register={register}
                  error={errors.name?.message}
                  placeholder='digite aqui o seu nome de usuário'
                  children="Nome do usuário:"
                  value={name}
                  type='text'
                  onChange={(e) => setName(e.target.value)}
                  className="border p-2 mb-2 w-full h-12 mt-2"
                />
              </div>
              <Input
                name='description'
                register={register}
                error={errors.description?.message}
                placeholder='digite aqui a descrição do seu perfil'
                children="Descrição do usuário:"
                value={description}
                type='text'
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 mb-2 w-full h-32 mt-2"
              />
              <Save className='cursor-pointer' onClick={handleSave} />
            </div>
          ) : (
            <>
              <div className='flex'>
                <div className='flex flex-col mx-4 md:mx-12'>
                  {name}
                  <br />
                  <p className='text-xl my-2 md:my-4'> {user.City} </p>
                </div>
                <Edit className='mb-2 md:mb-28 cursor-pointer' onClick={() => setIsEditing(true)} />
              </div>
            </>
          )}
        </div>
        <InformativeTextBox texto={description} />
        {usuarioDoador && (
          <>
            <p className='my-6 md:my-12'> CRIE SUA PRIMEIRA PUBLICAÇÃO </p>
            <Button
              isLink
              link='/platform'
              type="button"
              children="CRIAR PUBLICAÇÃO"
              classname="disabled:bg-[#7b50fc93] bg-primary rounded-full text-white text-lg md:text-xl leading-5 font-bold font-nunito-sans w-full md:w-2/4 py-3 md:py-[1.375rem] self-center"
            />
          </>
        )}
        <p className='my-6 md:my-12'>VOCÊ TAMBÉM PODE: </p>
        <p className='mb-12 md:mb-24'>CONFIGURAÇÕES DE PRIVACIDADE </p>
      </div>
      <Button
        isLink
        link='/platform'
        type="button"
        children="VOLTAR PARA A PÁGINA INICIAL"
        classname="disabled:bg-[#7b50fc93] bg-primary rounded-full text-white text-lg md:text-xl leading-5 font-bold font-nunito-sans w-full md:w-3/4 py-3 md:py-[1.375rem]"
      />
    </div>
  );
}