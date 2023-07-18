import React, { useRef, useState } from 'react'
import {
     Flex,
     Box,
     FormControl,
     FormLabel,
     Input,
     Stack,
     Button,
     useColorModeValue,
     InputGroup,
     InputRightElement,
     Text,
     Heading,
     VStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/auth/auth.actions';
import useToastMsg from '../customHooks/useToastMsg';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {

     const dispatch = useDispatch()
     const { loading } = useSelector(store => store.authManager);

     const navigate = useNavigate();

     const toastMsg = useToastMsg()
     const [showPassword, setShowPassword] = useState(false)
     const userNameRef = useRef();
     const emailRef = useRef()
     const pwdRef = useRef()


     const handleSignup = () => {
          const user = {
               username: userNameRef.current.value,
               email: emailRef.current.value,
               password: pwdRef.current.value,
          }

          dispatch(signup(user, navigate, toastMsg));
          userNameRef.current.value = "";
          emailRef.current.value = "";
          pwdRef.current.value = "";
     }

     return (
          <>
          <Box
                display="flex"
                justifyContent="center"
                p={3}
                bg="white"
                w={{base:"100%", md:"50%", lg:"50%", xl:"35%"}}
                m="40px auto 15px auto"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Text fontSize="4xl" fontFamily="sans-serif">
                    Create Account
                </Text>
            </Box>
               <Box border="1px solid gray" w={{base:"100%", md:"50%", lg:"50%", xl:"35%"}} margin="auto" marginTop="70px" borderRadius="10px">
                    <VStack spacing="5px"w={{base:"100%"}} margin="auto" padding="20px" marginTop="40px" borderRadius="10px"
                         bg={useColorModeValue('gray.50', 'gray.800')}>
                         <FormControl id="username" isRequired>
                              <FormLabel>Username</FormLabel>
                              <Input type="text" ref={userNameRef} placeholder="Username" />
                         </FormControl>
                         <FormControl id='email' isRequired>
                              <FormLabel>Email</FormLabel>
                              <Input type="email" ref={emailRef} placeholder='Email' />
                         </FormControl>
                         <FormControl id='password' isRequired>
                              <FormLabel>Password</FormLabel>
                              <InputGroup size="md">
                                   <Input type={showPassword ? 'text' : 'password'} ref={pwdRef} placeholder='Password' />
                                   <InputRightElement width="4.5rem">
                                        <span
                                             role='button'
                                             variant={'ghost'}
                                             onClick={() =>
                                                  setShowPassword((showPassword) => !showPassword)
                                             }>
                                             {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        </span>
                                   </InputRightElement>
                              </InputGroup>
                         </FormControl>
                         <Stack spacing={10} w="100%">
                              <Button
                                   w="100%"
                                   isLoading={loading}
                                   loadingText='Wait'
                                   onClick={handleSignup}
                                   bg={'blue.400'}
                                   color={'white'}
                                   _hover={{
                                        bg: 'blue.500',
                                   }}>
                                   Sign up
                              </Button>
                         </Stack>
                         <Stack pt={6}>
                              <Text align={'center'}>
                                   Already a user? <Link to="/signin" style={{ color: 'blue' }}>Sign in</Link>
                              </Text>
                         </Stack>
                    </VStack>
               </Box>
          </>
     )
}

export default Signup