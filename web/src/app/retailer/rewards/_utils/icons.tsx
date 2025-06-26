import { Award, CheckCircle, Calendar, TrendingUp, Gift, Star, Trophy } from 'lucide-react';

export const iconsByType = {
    credit: <Gift className="h-5 w-5" />,
    analystic: <TrendingUp className="h-4 w-4" />,
    support: <CheckCircle className="h-5 w-5" />,
    training: <Award className="h-5 w-5" />,
    ticket: <Calendar className="h-5 w-5" />,
    submission: <CheckCircle className="h-5 w-5" />,
    streak: <TrendingUp className="h-5 w-5" />,
    champion: <Award className="h-5 w-5" />,
    variety: <Star className="h-5 w-5" />,
    master: <Trophy className="h-5 w-5" />,
    accuracy: <CheckCircle className="h-5 w-5" />,
};
