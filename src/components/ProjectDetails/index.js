import { Modal } from '@mui/material';
import styled from 'styled-components';
import { Technologies, Technology } from '../shared/StyledComponents';
import { CloseRounded } from '@mui/icons-material';

const Container = styled.div`
    position: fixed;
    inset: 0;
    color: white;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    overflow-y: auto;
    padding: 30px 0px;
    background-color: #000000a7;
    transition: all 0.5s ease;

    @media (max-width: 768px) {
        align-items: flex-end; /* bottom sheet */
        padding: 0;
    }
`;

const Wrapper = styled.div`
    color: ${({ theme }) => theme.text_primary};
    background: ${({ theme }) => theme.card};
    position: relative;
    margin: 50px 12px;
    height: fit-content;
    padding: 20px 40px;
    border-radius: 16px;
    width: 100%;
    box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
    max-width: 800px;
    transition: all 0.5s ease-in-out;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 768px) {
        border-radius: 16px 16px 0 0;
        margin: 0 auto 0 auto;
        width: 100vw;
        max-width: 100vw;
        padding: 16px;
        height: 80vh;
        max-height: 80vh;
        overflow-y: auto;
        animation: slideUp 0.25s ease-out;
    }

    @keyframes slideUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
    }
`;

const Image = styled.img`
    font-size: 10px;
    width: 100%;
    border-radius: 12px;
    object-fit: cover;
    margin-top: 30px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);

    @media (max-width: 500px) {
        height: 170px;
    }
`;

const ProjectName = styled.div`
    font-weight: 600;
    font-size: 22px;
`;

const ProjectDesc = styled.ul`
    padding: 0px 20px;
`;

const ProjectDescItem = styled.li`
    font-size: 16px;
`;

const GithubButton = styled.a`
    text-decoration: none;
    border-radius: 6px;
    border: 1px;
    width: 75%;
    padding: 12px 16px;
    margin: auto;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    background: ${({ theme }) => theme.primary};
    color:${({ theme }) => theme.text_primary};
    transition: all 0.5s ease-in-out;
    margin-bottom: 20px;

    &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.primary + 99};
    }
`;

export const ProjectDetails = ({ openModal, setOpenModal }) => {
    const project = openModal?.project;

    return (
        <Modal open = { true } onClose = {
            () => setOpenModal({ state: false, project: null })
        }>
            <Container>
                <Wrapper>
                    <CloseRounded
                        style = {{
                            position: "absolute",
                            top: "10px",
                            right: "20px",
                            cursor: "pointer",
                        }}
                        onClick = {() => setOpenModal({ state: false, project: null })}
                    />
                    <Image src = {project?.image} alt = {project?.name + '.jpg'}/>
                    <ProjectName>{project?.name}</ProjectName>
                    <Technologies>
                    {
                        project?.technologies.map((ele, idx) => (
                            <Technology key = {idx}>{ele}</Technology>
                        ))
                    }
                    </Technologies>
                    <ProjectDesc>
                    {
                        project?.desc?.split('.').slice(0, -1).map((ele, idx) => (
                            <ProjectDescItem key = {idx}>{ele}.</ProjectDescItem>
                        ))
                    }
                    </ProjectDesc>
                    <GithubButton href = {project?.githubLink} target = "_blank">
                        Github Link
                    </GithubButton>
                </Wrapper>
            </Container>
        </Modal>
    );
}