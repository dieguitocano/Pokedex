import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameGlobal } from '../../store/slices/nameUser.slice'


const InputHome = () => {

  const { handleSubmit, reset, register } = useForm()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const submit = data => {
    console.log(data)
    dispatch(setNameGlobal(data.nameUser))
    reset({
      nameUser: ''
    })
    navigate('/pokedex')
  }


  return (
    <section className='webdesigntuts-workshop search-start'>
      <form onSubmit={handleSubmit(submit)}>
        <input placeholder='Place your trainer name'
          type="text" {...register
            ('nameUser')} />
        <button >start</button>
      </form>
    </section>
  )
}

export default InputHome