import styled from "styled-components";
import { footer } from "../../data/constants";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const Container = styled.div`
    width: 100%;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    align-items: center;
`;

const Name = styled.h2`
    font-weight: 500;
    font-size: 24px;
    color: ${({ theme }) => theme.primary};
`;

const Links = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 24px;
    font-size: 24px;
`;

const Link = styled.a`
    color: ${({ theme }) => theme.text_primary};
`;

const Copyright = styled.h3`
    color: ${({ theme }) => theme.text_primary};
    font-size: 14px;
    font-weight: 200;
`;

export const Footer = () => {
    return (
        <Container>
            <Wrapper>
                <Name>{footer?.name}</Name>
                <Links>
                    <Link href = {footer?.links?.linkedin} target = '_blank'>
                        <FaLinkedin/>
                    </Link>
                    <Link href = {footer?.links?.github} target = '_blank'>
                        <FaGithub/>
                    </Link>
                    <Link href = {footer?.links?.mail} target = '_blank'>
                        <FaEnvelope/>
                    </Link>                
                </Links>
                <Copyright>{footer?.copyright_message}</Copyright>
            </Wrapper>
        </Container>
    );
}