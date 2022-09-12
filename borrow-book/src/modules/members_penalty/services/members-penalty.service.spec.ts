import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MembersPenaltyEntities } from 'modules/members_penalty/entities';
import { MembersPenaltyService } from 'modules/members_penalty/services/members-penalty.service';
import { CreateMembersPenaltyDto } from 'modules/members_penalty/dtos/create-members-penalty.dto';
import { MemberEntities } from 'modules/members/entities';
import { MembersDto } from "modules/members/dtos";
import { MembersPenaltyDto } from "modules/members_penalty/dtos";
import { Repository } from "typeorm";

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>

describe('MembersPenaltyService', () => {
  let service: MembersPenaltyService;
  let _membersPenaltyRepository: MockRepository<MembersPenaltyEntities>

  const memberEntities: MemberEntities = {
    id: 1,
    code: 'M001',
    name: 'Rico',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    dtoClass: MembersDto
  };
  const membersPenaltyEntities: MembersPenaltyEntities = {
    id: 1,
    member: memberEntities,
    penalty_end_date: new Date(new Date().setDate(new Date().getDate() + 7)),
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    dtoClass: MembersPenaltyDto
  };

  const mockCreateMembersPenaltyDto: CreateMembersPenaltyDto = {
    member: memberEntities,
    penalty_end_date: new Date(new Date().setDate(new Date().getDate() + 7)),
  };

  const mockRepository = () => ({
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockReturnThis(),
      findOneBy: jest.fn().mockReturnThis()
    })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MembersPenaltyService,
        {
          provide: getRepositoryToken(MembersPenaltyEntities),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<MembersPenaltyService>(MembersPenaltyService);
    _membersPenaltyRepository = module.get<MockRepository<MembersPenaltyEntities>>(getRepositoryToken(MembersPenaltyEntities))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create MembersPenalty', async () => {
    jest
      .spyOn(_membersPenaltyRepository, 'save')
      .mockResolvedValue(membersPenaltyEntities)

    expect(
      await service.createMembersPenalty(mockCreateMembersPenaltyDto),
    ).toEqual(membersPenaltyEntities);
  });

  it('should get MembersPenalty', async () => {
    jest
      .spyOn(_membersPenaltyRepository, 'findOneBy')
      .mockResolvedValue(membersPenaltyEntities)

    const result = await service.getMemberPenalty(membersPenaltyEntities.member.id)
    expect(_membersPenaltyRepository.findOneBy).toHaveBeenCalled()
    expect(result).toEqual(membersPenaltyEntities)
  })
});
