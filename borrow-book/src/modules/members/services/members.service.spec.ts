import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MemberEntities } from 'modules/members/entities';
import { MemberService } from 'modules/members/services';
import { MembersDto, ResponseGetAllMembersDto } from "modules/members/dtos";
import { Repository } from "typeorm";

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>

describe('MemberService', () => {
  let service: MemberService;
  let _membersRepository: MockRepository<MemberEntities>

  const memberEntities: MemberEntities = {
    id: 1,
    code: 'M001',
    name: 'Rico',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    dtoClass: MembersDto
  };

  const memberDto: MembersDto = {
    id: 1,
    code: 'M001',
    name: 'Rico'
  }

  const mockRepository = () => ({
      find: jest.fn().mockReturnThis(),
      findOneBy: jest.fn().mockReturnThis()
    })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: getRepositoryToken(MemberEntities),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<MemberService>(MemberService);
    _membersRepository = module.get<MockRepository<MemberEntities>>(getRepositoryToken(MemberEntities))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get Member by id', async () => {
    jest
      .spyOn(_membersRepository, 'findOneBy')
      .mockResolvedValue(memberEntities)

    expect(
      await service.getMember(memberEntities.id),
    ).toEqual(memberEntities);
  });

  it('should get AllMember', async () => {
    jest
      .spyOn(_membersRepository, 'find')
      .mockResolvedValue(memberEntities)

    const result = await service.getAllMember()
    expect(_membersRepository.find).toHaveBeenCalled()
    expect(result).toEqual(memberEntities)
  })
});
