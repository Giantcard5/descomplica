import {
    FetchService
} from "../api/fetch.service";

export class SuggestionService extends FetchService {
    private static instance: SuggestionService;

    private constructor() {
        super();
    }

    static getInstance(): SuggestionService {
        if (!SuggestionService.instance) {
            SuggestionService.instance = new SuggestionService();
        }
        return SuggestionService.instance;
    }
}

export default SuggestionService.getInstance();