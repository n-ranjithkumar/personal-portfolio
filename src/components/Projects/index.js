import styled from 'styled-components';
import { projects } from '../../data/constants';
import { Title, Desc, Technologies, Technology } from '../shared/StyledComponents';

const Container = styled.div`
    width: 100%;
    padding: 0px 30px;
    background: linear-gradient(343.07deg, rgba(132, 59, 206, 0.06) 5.71%, rgba(132, 59, 206, 0) 64.83%);
    clip-path: polygon(0 0, 100% 0, 100% 100%,100% 98%, 0 100%);
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 10px 0px 100px 0px;
    gap: 12px;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

const ProjectsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    margin-top: 30px;
    align-items: center;
    justify-content: center;
`;

const ProjectDesc = styled.ul`
    padding: 0px 20px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;  
    overflow: hidden;
`;

const Project = styled.div`
    color: ${({ theme }) => theme.text_secondary};
    padding: 20px 25px;
    border-radius: 5px;
    box-shadow: 0 0 12px 2px rgba(0,0,0,0.25);
    max-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow-y: hidden;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    height: 470px;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 30px 4px rgba(0,0,0,0.35);
        filter: brightness(1.06);
    }

    @media (max-width: 500px) {
        max-width: 350px;
        height: 450px;
    }
`;

const Image = styled.img`
    font-size: 10px;
    width: 100%;
    height: 185 px;
    border-radius: 5px;

    @media (max-width: 500px) {
        height: 150px;
    }
`;

const ProjectName = styled.div`
    font-weight: 600;
    font-size: 22px;
`;


const ProjectDescItem = styled.li`
    font-size: 16px;
`;

export const Projects = ({ setOpenModal }) => {
    return (
        <Container id = 'projects'>
            <Wrapper>
                <Title>{projects?.title}</Title>
                <Desc>{projects?.desc}</Desc>
                <ProjectsContainer>
                    {
                        projects?.data?.map((item, index) => (
                            <Project key = {index} 
                            onClick = {
                                () => setOpenModal({ state: true, project: item})
                            }>
                                <Image src = {item?.image} alt = {item?.name + '.jpg'}/>
                                <ProjectName>{item?.name}</ProjectName>
                                <Technologies>
                                    {
                                        item?.technologies.map((ele, idx) => (
                                            <Technology key = {idx}>{ele}</Technology>
                                        ))
                                    }
                                </Technologies>
                                <ProjectDesc>
                                    {
                                        item?.desc?.split('.').slice(0, -1).map((ele, idx) => (
                                            <ProjectDescItem key = {idx}>{ele}.</ProjectDescItem>
                                        ))
                                    }
                                </ProjectDesc>
                            </Project>
                        ))
                    }
                </ProjectsContainer>
            </Wrapper>
        </Container>
    );
}