import { Button, Link } from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLazyCurrentQuery, useLoginMutation } from '../../app/services/userApi';
import { ErorMessage } from '../../components/error-message';
import { Input } from '../../components/input';
import { hasErrorField } from '../../utils/has-error-field';

type Login = {
    email: string;
    password: string;
}
type Props ={
    setSelected: (value: string) =>void
}

export const Login = ({setSelected}: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  }=useForm<Login>({
    mode: 'onChange', 
    reValidateMode: 'onBlur',
    defaultValues: {
        email: '',
        password: ''
    }
  })
  const[login, {isLoading}]=useLoginMutation()
  const navigate = useNavigate()
  const[error, setError]=useState('')
  const [triggerCurrentCuery]=useLazyCurrentQuery()

    const onSubmit = async (data:Login)=> {
      try {
        await login(data).unwrap()
        await triggerCurrentCuery().unwrap();
        navigate('/')
      } catch (error) {
        if(hasErrorField(error)){
          setError(error.data.error)
       }
      }
    }
    return (
    <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
       <Input 
       control={control}
       name ="email"
       label='Email'
       type="email"
       required='Обязательное поле'
       /> 
       <Input 
       control={control}
       name ="password"
       label='Password'
       type="password"
       required='Обязательное поле'
       /> 
        <ErorMessage error={error}/>
       <p className="text-center text-small">
        Нет акаунта?{' '}
        <Link
        size='sm'
        className='cursor-pointer'
        onPress={()=>setSelected("sign-up")}
        >
        Зарегестрируйтесь
        </Link>
       </p>
       <div className="flex gap-2 justify-end">
        <Button fullWidth color='primary' type='submit'isLoading={isLoading}>
          Войти
        </Button>
       </div>
    </form>
  )
}
