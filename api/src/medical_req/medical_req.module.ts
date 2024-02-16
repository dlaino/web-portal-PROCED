import { Module } from '@nestjs/common';
import { MedicalReqService } from './services/medical_req.service';
import { MedicalReqController } from './controllers/medical_req.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalReq } from './entities/medical_req.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalReq, User])],
  providers: [MedicalReqService],
  controllers: [MedicalReqController],
})
export class MedicalReqModule {}
