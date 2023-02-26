import {Injectable} from '@nestjs/common'
import { PlayerStatsRepostiroy } from './playerStats.repository';


@Injectable()
export class PlayerStatsService {
    constructor(private readonly playerStatsRepository: PlayerStatsRepostiroy) {}

    //todo
    //whole stats display logic and ensure correct db population
}