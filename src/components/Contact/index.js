import styled from 'styled-components';
import { Title, Desc } from '../shared/StyledComponents';
import { contact } from '../../data/constants';
import { useRef, useState, useMemo } from 'react';
import emailjs from '@emailjs/browser';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    justify-content: center;
    padding: 10px;
    color: ${({ theme }) => theme.text_primary};
`;

const Wrapper = styled.form`
    background: ${({ theme }) => theme.card};
    border: 0.1px solid ${({ theme }) => theme.primary};
    border-radius: 16px;
    width: 50%;
    margin-top: 30px;
    box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
    background: ${({ theme }) => theme.card};
    padding: 28px 36px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-width: 300px;
`;

const WrapperHeader = styled.div`
    font-size: 24px;
    font-weight: 600;
`;

const TextInput = styled.input`
    padding: 10px;
    font-size: 18px;
    background: transparent;
    border: 0.1px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_secondary};
    border-radius: 8px;
`;

const TextArea = styled.textarea`
    padding: 10px;
    font-size: 18px;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_secondary};
    border-radius: 8px;
    resize: none;
    overflow-y: auto;
    outline: none;
    box-shadow: none;
    min-height: 100px;
    &:focus {
        border-color: ${({ theme }) => theme.primary};
        outline: none;
        box-shadow: 0 0 0 3px rgba(133, 76, 230, 0.15);
    }
`;

const SubmitButton = styled.button`
    padding: 10px;
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text_primary};
    font-size: 18px;
    font-weight: 600;
    border-radius: 8px;
    border: 0px;
    display: inline-flex;
    align-items: center;
    gap: 8px;

    &:hover {
        cursor: pointer;
        background: ${({ theme }) => theme.primary + 99};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
        background: ${({ theme }) => theme.primary + 55};
    }
`;

const ErrorText = styled.div`
    color: #ff6b6b;
    font-size: 14px;
`;

export const Contact = () => {
    const form = useRef();

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [touchedEmail, setTouchedEmail] = useState(false);

    const isValidEmail = useMemo(() => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        return emailRegex.test(userEmail.trim());
    }, [userEmail]);

    const allFilled = userName.trim() !== "" && userEmail.trim() !== "" && message.trim() !== "";
    const formValid = allFilled && isValidEmail;

    function submitHandler(e) {
        e.preventDefault();
        if (!formValid || isSending) return;
        setIsSending(true);
        
        emailjs.sendForm(
            process.env.REACT_APP_EMAIL_SERVICE_ID,
            process.env.REACT_APP_EMAIL_TEMPLATE_ID, 
            form.current, 
            process.env.REACT_APP_EMAIL_PUBLIC_KEY)
        .then((result) => {
            form.current.reset();
            setUserName("");
            setUserEmail("");
            setMessage("");
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        }).finally(() => setIsSending(false));
    };

    return (
        <Container id = 'contact'>
            <Title>{contact?.title}</Title>
            <Desc>{contact?.desc}</Desc>
            <Wrapper ref = {form} onSubmit = {submitHandler}>
                <WrapperHeader>{contact?.email_heading}</WrapperHeader>
                <TextInput type = 'text' key = {1}
                placeholder = {contact?.input_placeholders[0]} 
                required = {true}
                name = 'user_name'
                value = {userName}
                onChange = {(e) => setUserName(e.target.value)}/>
                <TextInput type = 'email' key = {2}
                placeholder = "Email" 
                required = {true}
                name = 'user_email'
                value = {userEmail}
                onChange = {(e) => setUserEmail(e.target.value)}
                onBlur = {() => setTouchedEmail(true)}/>
                {/* Inline error removed per request */}
                {
                    contact?.text_placeholders?.map((item, index) => (
                        <TextArea 
                        key = {index}
                        placeholder = {item} 
                        required = {true}
                        name = 'message'
                        value = {message}
                        onChange = {(e) => setMessage(e.target.value)}/>
                    ))
                }
                <SubmitButton type = 'submit' disabled = {!formValid || isSending}>
                    {isSending ? (
                        <>
                            <span role="img" aria-label="sending">⏳</span>
                            Sending...
                        </>
                    ) : (
                        <>
                            <span role="img" aria-label="send">✉️</span>
                            {contact?.button_content}
                        </>
                    )}
                </SubmitButton>
            </Wrapper>
        </Container>
    );
}