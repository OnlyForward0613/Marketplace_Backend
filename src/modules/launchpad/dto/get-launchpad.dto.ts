import { CreateLaunchpadDto } from './create-launchpad.dto';

export class GetLaunchpadDto extends CreateLaunchpadDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
