package music_web.history.service;

import java.util.List;

import org.springframework.stereotype.Service;

import music_web.history.entity.ListeningHistory;
import music_web.history.repository.ListeningHistoryRepository;

@Service
public class HistoryService {
     private final ListeningHistoryRepository repository;

    public HistoryService(ListeningHistoryRepository repository) {
        this.repository = repository;
    }

    public ListeningHistory saveHistory(Long userId, Long songId) {
        ListeningHistory history = new ListeningHistory();
        history.setUserId(userId);
        history.setSongId(songId);
        return repository.save(history);
    }

    public List<ListeningHistory> getUserHistory(Long userId) {
        return repository.findByUserIdOrderByListenedAtDesc(userId);
    }
}
