import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import authErrorMessageParser from '../../../utils/authErrorMessageParser';

import styles from './Sign.style';
import Loading from '../../../Components/Loading/Loading';
import Input from '../../../Components/Input/Input';
import Button from '../../../Components/Button/Button';

const initialFormValues = {
  usermail: '',
  password: '',
  repassword: '',
};

const validationSchema = yup.object().shape({
  usermail: yup
    .string()
    .email('Geçerli bir e-posta adresi giriniz.')
    .required('E-posta adresi gereklidir.'),
  password: yup
    .string()
    .min(6, 'Şifre en az 6 karakter olmalıdır.')
    .required('Şifre gereklidir.'),
  repassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Şifreler eşleşmiyor.')
    .required('Şifre tekrarı gereklidir.'),
});

const Sign = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const handleBack = () => {
    navigation.goBack();
  };

  async function handleFormSubmit(formValues) {
    try {
      setLoading(true);
      await auth().createUserWithEmailAndPassword(
        formValues.usermail,
        formValues.repassword,
      );

      showMessage({
        message: 'Hadi yine iyisin',
        type: 'success',
      });
      navigation.navigate('LoginScreen');
      setLoading(false);
    } catch (error) {
      console.log(error);

      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
      });

      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Code About</Text>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}>
        {({values, handleChange, handleSubmit, errors, touched}) => (
          <>
            <Input
              onType={handleChange('usermail')}
              value={values.usermail}
              placeholder="e-posta giriniz"
              error={touched.usermail && errors.usermail}
            />
            <Input
              onType={handleChange('password')}
              value={values.password}
              placeholder="şifre giriniz"
              isSecure
              error={touched.password && errors.password}
            />
            <Input
              onType={handleChange('repassword')}
              value={values.repassword}
              placeholder="şifreyi tekrar giriniz"
              isSecure
              error={touched.repassword && errors.repassword}
            />
            <Button
              text={'Kayıt Ol'}
              onPress={handleSubmit}
              loading={loading}
            />
          </>
        )}
      </Formik>

      <Button text={'Geri Dön'} theme="secondary" onPress={handleBack} />
    </SafeAreaView>
  );
};

export default Sign;
