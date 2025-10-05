import styled from 'styled-components';
import { skills } from '../../data/constants';
import { Title, Desc} from '../shared/StyledComponents';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
`;

export const Wrapper = styled.div`
    max-width: 1100px;
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: ${({ theme }) => theme.bg};
    gap: 12px;
`;


export const SkillsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
`;

export const Skill = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
    background: ${({ theme }) => theme.card};
    border: 0.1px solid ${({ theme }) => theme.primary};
    border-radius: 16px;
    padding: 18px 36px;

    @media (max-width: 768px) {
        max-width: 400px;
        padding: 10px 36px;
    }

    @media (max-width: 500px) {
        max-width: 330px;
        padding: 10px 36px;
    }
`;

export const SkillTitle = styled.div`
    font-weight: 600;
    font-size: 28px;
    color: ${({ theme }) => theme.text_secondary};
    margin-bottom: 20px;
    text-align: center;
`;

export const SkillList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
    gap: 12px;
`;

export const SkillItem = styled.div`
    border: 1px solid white;
    border-radius: 5px;
    color: ${({ theme }) => theme.text_primary + 80};
    padding: 12px 16px;
    font-size: 16px;
    border: 1px solid ${({ theme }) => theme.text_primary + 80};
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    @media (max-width: 768px) {
        font-size: 14px;
        padding: 8px 12px;
    }

    @media (max-width: 500px) {
        font-size: 14px;
        padding: 6px 12px;
    }
`;

export const SkillImage = styled.img`
    width: 24px;
    height: 24px;
`;

export const Skills = () => {
    return (
        <Container id = "skills">
            <Wrapper>
                <Title>{skills.title}</Title>
                <Desc>{skills.desc}</Desc>
                <SkillsContainer>
                    {
                        skills.data.map((item, index) => (
                            <Skill key = {index}>
                                <SkillTitle>{item.skillTitle}</SkillTitle>
                                <SkillList>
                                    {
                                        item.skillList.map((skill, idx) => (
                                            <SkillItem key = {idx}>
                                                {skill.image && <SkillImage src = {skill.image} alt = ""/>}
                                                {skill.name}
                                            </SkillItem>
                                        ))
                                    }
                                </SkillList>
                            </Skill>
                        ))
                    }
                </SkillsContainer>
            </Wrapper>
        </Container>
    );
}